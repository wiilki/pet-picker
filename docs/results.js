/* Pet Picker's on-page adoption directory. Public read-only feed; no private API credentials. */
(function () {
  "use strict";

  var API = "https://petnecto.com/api/v1/pets";
  var SAVED_KEY = "petpicker.saved-pets.v1";
  var PER_PAGE = 12;
  var SPECIES = { dog: "Dog", cat: "Cat", rabbit: "Rabbit", bird: "Bird", horse: "Horse", "small-and-furry": "Small pet" };
  var EMOJI = { Dog: "🐶", Cat: "🐱", Rabbit: "🐰", Bird: "🐦", Horse: "🐴", "Small pet": "🐹" };
  var results = document.getElementById("results");
  var grid = document.getElementById("resultsGrid");
  var status = document.getElementById("resultsStatus");
  var description = document.getElementById("resultsDescription");
  var empty = document.getElementById("resultsEmpty");
  var emptyTitle = document.getElementById("emptyTitle");
  var emptyMessage = document.getElementById("emptyMessage");
  var more = document.getElementById("resultsMore");
  var moreButton = document.getElementById("loadMorePets");
  var providerLink = document.getElementById("resultsPetfinder");
  var emptyLink = document.getElementById("emptyPetfinder");
  var detailDialog = document.getElementById("petDetailsDialog");
  var detailBody = document.getElementById("petDetailBody");
  var requestController = null;
  var requestSerial = 0;
  var currentFilters = null;
  var page = 0;
  var cursor = null;
  var hasMore = false;
  var shownIds = new Set();
  var loadedPets = new Map();

  function readSavedPets() {
    try {
      var data = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      return Array.isArray(data) ? data.filter(function (p) {
        return p && typeof p.id === "string" && p.url;
      }).slice(0, 50) : [];
    } catch (error) { return []; }
  }
  var savedPets = readSavedPets();
  function persistSavedPets() {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(savedPets)); }
    catch (error) { /* Storage can be blocked; browsing still works. */ }
    renderFavoritePanel();
    updateFavoriteButtons();
  }
  function isSaved(id) { return savedPets.some(function (p) { return p.id === id; }); }
  function addOrRemoveFavorite(pet) {
    if (isSaved(pet.id)) {
      savedPets = savedPets.filter(function (p) { return p.id !== pet.id; });
    } else {
      savedPets.unshift({ id: pet.id, name: pet.name, photo: pet.photos[0] || "", url: pet.url, listingUrl: pet.listingUrl, rescue: pet.rescueName, location: pet.location, species: pet.species });
      savedPets = savedPets.slice(0, 50);
    }
    persistSavedPets();
  }
  function safeUrl(value) {
    if (typeof value !== "string") return "";
    try {
      var url = new URL(value, "https://petnecto.com/");
      return url.protocol === "https:" ? url.href : "";
    } catch (error) { return ""; }
  }
  function str(value) {
    if (value === undefined || value === null || value === "") return "";
    if (typeof value === "string" || typeof value === "number") return String(value).trim();
    if (Array.isArray(value)) return value.map(str).filter(Boolean).join(", ");
    if (typeof value === "object") return str(value.name || value.label || value.value || value.display || value.en || value.text || value.primary || value.group);
    return "";
  }
  function text(value, fallback) { return str(value) || fallback || "Not listed"; }
  function element(tag, className, content) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }
  function button(label, className, fn) {
    var b = element("button", className, label);
    b.type = "button";
    b.addEventListener("click", fn);
    return b;
  }
  function anchor(label, url, className) {
    var a = element("a", className, label);
    a.href = safeUrl(url) || "https://petnecto.com/";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }
  function photoUrls(raw) {
    if (raw.photo_rights === "link-out" || raw.photo_rights === "none") return [];
    var source = Array.isArray(raw.photos) ? raw.photos : (raw.photos ? [raw.photos] : []);
    if (!source.length && raw.photo) source = [raw.photo];
    return source.map(function (p) {
      if (typeof p === "string") return safeUrl(p);
      return safeUrl(p && (p.url || p.large || p.medium || p.full || p.original || p.src || p.href || p.thumbnail || p.thumb));
    }).filter(Boolean).slice(0, 8);
  }
  function humanBreed(value) {
    if (!value) return "Breed not listed";
    if (Array.isArray(value)) {
      var names = value.map(function (v) { return str(v); }).filter(Boolean);
      return names.length ? names.join(" / ") : "Breed not listed";
    }
    return text(value, "Breed not listed");
  }
  function cityText(pet, rescue) {
    var location = pet.location || rescue.location || rescue.place || {};
    if (typeof location === "string") return location;
    var city = str(location.city || rescue.city || pet.city);
    var state = str(location.state || location.region || rescue.state || pet.state);
    if (city && state) return city + ", " + state;
    return city || state || str(location.name) || "";
  }
  function normalize(raw) {
    if (!raw || typeof raw !== "object") return null;
    var rescue = (raw.rescue && typeof raw.rescue === "object") ? raw.rescue : {};
    var id = str(raw.id || raw.pet_id);
    if (!id) return null;
    var species = str(raw.species);
    var pageUrl = safeUrl(raw.url || raw.pet_url || ("https://petnecto.com/pets/" + encodeURIComponent(id)));
    var listingUrl = safeUrl(raw.listing_url || raw.listingUrl || raw.source_url);
    var description = str(raw.summary || raw.description || raw.about || (raw.display && raw.display.summary));
    return {
      id: id,
      name: text(raw.name, "Your future friend"),
      species: species,
      breed: humanBreed(raw.breeds || raw.breed),
      age: text(raw.age_group || raw.age),
      size: text(raw.size),
      sex: text(raw.sex || raw.gender),
      color: text(raw.color || raw.colour),
      photos: photoUrls(raw),
      summary: description,
      rescueName: text(rescue.name || raw.organization_name, "Rescue or shelter"),
      rescueUrl: safeUrl(rescue.url || rescue.website || rescue.website_url || rescue.adoption_url),
      location: cityText(raw, rescue),
      adoptionDetails: str(rescue.how_to_adopt || rescue.adoption_process || rescue.description),
      fee: raw.fee === 0 ? "Free" : str(raw.fee || raw.adoption_fee),
      goodWith: raw.good_with && typeof raw.good_with === "object" ? raw.good_with : {},
      traits: (raw.temperament && typeof raw.temperament === "object") ? raw.temperament : {},
      listingUrl: listingUrl,
      url: pageUrl,
      attribution: str(raw.attribution && raw.attribution.text),
      attributionUrl: safeUrl(raw.attribution && raw.attribution.url),
      rights: str(raw.photo_rights),
      updated: str(raw.updated_at || raw.updated || raw.last_updated),
      raw: raw
    };
  }
  function extractPets(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.pets)) return data.pets;
    if (data && Array.isArray(data.results)) return data.results;
    if (data && Array.isArray(data.items)) return data.items;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && data.data && Array.isArray(data.data.pets)) return data.data.pets;
    throw new Error("The provider returned an unexpected result format.");
  }
  function buildQuery(filters, newPage, nextCursor) {
    var p = new URLSearchParams();
    p.set("country", "US");
    p.set("species", SPECIES[filters.type] || "Dog");
    p.set("found", "exclude");
    p.set("detail", "full");
    p.set("lang", "en");
    p.set("limit", String(PER_PAGE));
    if (filters.zip) {
      p.set("near", filters.zip);
      p.set("miles", "100");
      p.set("sort", "distance");
    } else {
      p.set("sort", "photo");
    }
    if (filters.age) p.set("age", filters.age === "xlarge" ? "X-Large" : capitalize(filters.age));
    if (filters.size) p.set("size", filters.size === "xlarge" ? "X-Large" : capitalize(filters.size));
    if (filters.gender) p.set("sex", capitalize(filters.gender));
    if (nextCursor) p.set("cursor", nextCursor);
    else p.set("page", String(newPage));
    return API + "?" + p.toString();
  }
  function capitalize(value) { return value.charAt(0).toUpperCase() + value.slice(1); }
  function placeholder(pet, label) {
    var box = element("div", "pet-photo-placeholder");
    box.append(element("span", "pet-photo-emoji", EMOJI[pet.species] || "🐾"));
    box.append(element("span", "pet-no-image", label || "Photo unavailable"));
    return box;
  }
  function card(pet) {
    var article = element("article", "result-card");
    article.dataset.petId = pet.id;
    var imageButton = button("", "result-photo-button", function () { openDetails(pet); });
    imageButton.setAttribute("aria-label", "View full details for " + pet.name);
    if (pet.photos[0]) {
      var img = element("img");
      img.src = pet.photos[0];
      img.alt = pet.name + ", an adoptable " + (pet.species || "pet");
      img.loading = "lazy"; img.decoding = "async";
      img.addEventListener("error", function () { img.replaceWith(placeholder(pet)); });
      imageButton.append(img);
    } else imageButton.append(placeholder(pet));
    imageButton.append(element("span", "result-image-tag", "Meet " + pet.name));
    var save = button(isSaved(pet.id) ? "♥" : "♡", "result-heart", function () { addOrRemoveFavorite(pet); });
    save.dataset.savePet = pet.id;
    save.setAttribute("aria-label", isSaved(pet.id) ? "Remove " + pet.name + " from saved pets" : "Save " + pet.name);
    save.setAttribute("aria-pressed", String(isSaved(pet.id)));
    var cardImage = element("div", "result-image"); cardImage.append(imageButton, save);
    var body = element("div", "result-copy");
    var eyebrow = element("p", "result-eyebrow", text(pet.species, "PET") + (pet.location ? " · " + pet.location : ""));
    var name = element("h3", "result-name", pet.name);
    var breed = element("p", "result-breed", pet.breed);
    var meta = element("div", "result-chips");
    [pet.age, pet.size, pet.sex].filter(function (v) { return v && v !== "Not listed"; }).forEach(function (v) { meta.append(element("span", "result-chip", v)); });
    var org = element("p", "result-shelter", "⌂  " + pet.rescueName);
    var actions = element("div", "result-actions");
    actions.append(button("Full profile ↗", "result-details-button", function () { openDetails(pet); }));
    actions.append(anchor("Shelter listing ↗", pet.listingUrl || pet.url, "result-shelter-link"));
    body.append(eyebrow, name, breed, meta, org, actions);
    article.append(cardImage, body);
    return article;
  }
  function updateFavoriteButtons() {
    document.querySelectorAll("[data-save-pet]").forEach(function (b) {
      var pet = loadedPets.get(b.dataset.savePet);
      if (!pet) return;
      var active = isSaved(pet.id);
      b.textContent = active ? "♥" : "♡";
      b.setAttribute("aria-pressed", String(active));
      b.setAttribute("aria-label", (active ? "Remove " : "Save ") + pet.name + (active ? " from saved pets" : ""));
    });
  }
  function detailRow(label, value) {
    var row = element("div", "pet-data-row");
    row.append(element("dt", "", label), element("dd", "", value || "Not listed"));
    return row;
  }
  function yesNo(value) {
    if (value === true || String(value).toLowerCase() === "yes") return "Yes";
    if (value === false || String(value).toLowerCase() === "no") return "No";
    return "Not stated";
  }
  function photoGallery(pet) {
    var area = element("div", "pet-detail-media");
    var active = element("div", "pet-detail-primary-image");
    function showPhoto(url) {
      active.replaceChildren();
      if (!url) { active.append(placeholder(pet)); return; }
      var image = element("img");
      image.src = url; image.alt = "Photo of " + pet.name;
      image.addEventListener("error", function () { image.replaceWith(placeholder(pet)); });
      active.append(image);
    }
    showPhoto(pet.photos[0]);
    area.append(active);
    if (pet.photos.length > 1) {
      var thumbs = element("div", "pet-gallery-thumbs");
      pet.photos.forEach(function (url, index) {
        var b = button("", "pet-thumb" + (index === 0 ? " is-active" : ""), function () {
          thumbs.querySelectorAll("button").forEach(function (item) { item.classList.remove("is-active"); });
          b.classList.add("is-active");
          showPhoto(url);
        });
        b.setAttribute("aria-label", "View photo " + (index + 1) + " of " + pet.name);
        var img = element("img"); img.src = url; img.alt = ""; img.loading = "lazy";
        b.append(img); thumbs.append(b);
      });
      area.append(thumbs);
    }
    return area;
  }
  function openDetails(pet) {
    detailBody.replaceChildren();
    var layout = element("div", "pet-detail-layout");
    var right = element("div", "pet-detail-content");
    right.append(element("span", "kicker", "A LITTLE MORE ABOUT ME"));
    right.append(element("h2", "pet-detail-name", pet.name));
    right.append(element("p", "pet-detail-subtitle", [pet.breed, pet.location].filter(Boolean).join(" · ")));
    var tags = element("div", "pet-detail-tags");
    [pet.age, pet.size, pet.sex].filter(function (value) { return value && value !== "Not listed"; }).forEach(function (v) {
      tags.append(element("span", "result-chip", v));
    });
    right.append(tags);
    var heading = element("h3", "", "Meet " + pet.name);
    right.append(heading);
    right.append(element("p", "pet-detail-bio", pet.summary || "The shelter has not provided a description yet. Open their listing for more information."));
    var dataHead = element("h3", "", "The essentials");
    var dl = element("dl", "pet-detail-data");
    dl.append(detailRow("Breed", pet.breed), detailRow("Age", pet.age), detailRow("Size", pet.size), detailRow("Sex", pet.sex), detailRow("Color", pet.color));
    if (pet.fee) dl.append(detailRow("Adoption fee", pet.fee));
    right.append(dataHead, dl);
    var good = pet.goodWith;
    var hasGood = good && Object.keys(good).length > 0;
    if (hasGood) {
      right.append(element("h3", "", "Good with"));
      var friends = element("dl", "pet-detail-data");
      friends.append(detailRow("Dogs", yesNo(good.dogs)), detailRow("Cats", yesNo(good.cats)), detailRow("Children", yesNo(good.kids !== undefined ? good.kids : good.children)));
      right.append(friends);
    }
    right.append(element("h3", "", "Rescue & adoption"));
    right.append(element("p", "pet-detail-bio", pet.rescueName + (pet.location ? " · " + pet.location : "")));
    if (pet.adoptionDetails) right.append(element("p", "pet-detail-bio", pet.adoptionDetails));
    var links = element("div", "pet-detail-links");
    links.append(anchor("View original listing ↗", pet.listingUrl || pet.url, "button dark-button"));
    links.append(anchor("View on Petnecto ↗", pet.url, "button outline-button"));
    if (pet.rescueUrl) links.append(anchor("Rescue website ↗", pet.rescueUrl, "pet-detail-extra-link"));
    links.append(button(isSaved(pet.id) ? "♥ Saved" : "♡ Save pet", "button outline-button", function (event) {
      addOrRemoveFavorite(pet);
      event.currentTarget.textContent = isSaved(pet.id) ? "♥ Saved" : "♡ Save pet";
    }));
    right.append(links);
    if (pet.attribution) right.append(anchor("Photo / listing credit: " + pet.attribution, pet.attributionUrl || pet.url, "pet-credit"));
    right.append(element("p", "pet-detail-note", "Details and availability can change. Confirm with the shelter before visiting or applying."));
    layout.append(photoGallery(pet), right);
    detailBody.append(layout);
    detailDialog.showModal();
  }
  function renderFavoritePanel() {
    var container = document.getElementById("savedPetPanel");
    if (!container) {
      container = element("section", "saved-pets-panel");
      container.id = "savedPetPanel";
      var heading = element("h3", "", "Saved pets");
      var summary = element("p", "", "Saved pet information is a snapshot. Always verify availability with the rescue.");
      var items = element("div", "saved-pet-items");
      items.id = "savedPetItems";
      container.append(heading, summary, items);
      document.getElementById("savedList").after(container);
    }
    var panel = document.getElementById("savedPetItems");
    panel.replaceChildren();
    if (!savedPets.length) {
      panel.append(element("p", "pet-saved-empty", "No pets saved yet. Tap ♡ on a pet card to keep it here."));
      return;
    }
    savedPets.forEach(function (item) {
      var row = element("div", "saved-pet-row");
      if (item.photo) {
        var img = element("img"); img.src = safeUrl(item.photo); img.alt = "Photo of " + item.name;
        row.append(img);
      }
      var content = element("div");
      content.append(element("strong", "", item.name), element("small", "", [item.rescue, item.location].filter(Boolean).join(" · ")));
      var links = element("div", "saved-pet-actions");
      links.append(anchor("↗", item.listingUrl || item.url, ""));
      links.append(button("×", "", function () { savedPets = savedPets.filter(function (p) { return p.id !== item.id; }); persistSavedPets(); }));
      links.lastChild.setAttribute("aria-label", "Remove " + item.name + " from saved pets");
      links.firstChild.setAttribute("aria-label", "Open " + item.name + " adoption listing");
      row.append(content, links);
      panel.append(row);
    });
  }
  function showSkeleton() {
    grid.replaceChildren();
    for (var i = 0; i < 6; i++) {
      var block = element("div", "pet-skeleton");
      block.append(element("div", "skeleton-image"), element("div", "skeleton-line"), element("div", "skeleton-line small"));
      grid.append(block);
    }
  }
  function updateLinks(filters) {
    var href = (window.PetPickerDirectory && window.PetPickerDirectory.buildUrl) ?
      window.PetPickerDirectory.buildUrl(filters) : "https://www.petfinder.com/search/";
    providerLink.href = href;
    emptyLink.href = href;
  }
  function showEmpty(message, failure) {
    empty.hidden = false;
    emptyTitle.textContent = failure ? "This preview isn't loading right now." : "No matches in our current feed.";
    emptyMessage.textContent = message;
    status.textContent = "";
  }
  async function getPage(append) {
    var serial = ++requestSerial;
    if (requestController) requestController.abort();
    requestController = new AbortController();
    status.textContent = append ? "Loading more pets…" : "Finding adoptable pets…";
    more.hidden = true;
    empty.hidden = true;
    if (!append) {
      grid.setAttribute("aria-busy", "true");
      showSkeleton();
    }
    try {
      var nextPage = append ? page + 1 : 1;
      var url = buildQuery(currentFilters, nextPage, append ? cursor : null);
      var response = await fetch(url, { signal: requestController.signal, headers: { "Accept": "application/json" } });
      if (!response.ok) throw new Error("Live listing service returned " + response.status);
      var data = await response.json();
      var incoming = extractPets(data);
      var nextCursor = typeof data.next_cursor === "string" ? data.next_cursor :
        (data.pagination && typeof data.pagination.next_cursor === "string" ? data.pagination.next_cursor : "");
      var nextPageExists = data.has_more === true || (data.pagination && data.pagination.has_more === true) ||
        !!nextCursor || (incoming.length >= PER_PAGE);
      var fresh = incoming.map(normalize).filter(Boolean);
      if (serial !== requestSerial) return;
      if (!append) { grid.replaceChildren(); shownIds.clear(); loadedPets.clear(); }
      var added = 0;
      fresh.forEach(function (pet) {
        if (shownIds.has(pet.id)) return;
        shownIds.add(pet.id);
        loadedPets.set(pet.id, pet);
        grid.append(card(pet));
        added++;
      });
      cursor = nextCursor;
      page = nextPage;
      hasMore = nextPageExists && incoming.length > 0 && page < 20;
      more.hidden = !hasMore;
      status.textContent = shownIds.size ? ("Showing " + shownIds.size + " pets from covered shelters" + (hasMore ? " · More available" : "")) : "";
      if (shownIds.size === 0) {
        showEmpty(currentFilters.zip ?
          "No pets matched your filters near " + currentFilters.zip + " in this provider's limited U.S. coverage. Petfinder has broader coverage; your filters will be passed through." :
          "No pets matched these filters in the shelters this feed currently covers. Try a different pet type, age, or size—or continue on Petfinder.", false);
      } else {
        empty.hidden = true;
      }
      if (!added && append) { more.hidden = true; hasMore = false; }
    } catch (e) {
      if (serial !== requestSerial || e.name === "AbortError") return;
      if (!append) grid.replaceChildren();
      showEmpty("The pet listing service couldn't be reached. You can still search Petfinder with your selected filters using the link below.", true);
      more.hidden = true;
    } finally {
      if (serial === requestSerial) { grid.removeAttribute("aria-busy"); moreButton.disabled = false; }
    }
  }
  function search(filters, opts) {
    currentFilters = Object.assign({ type: "dog", zip: "", age: "", size: "", gender: "" }, filters);
    page = 0;
    cursor = "";
    updateLinks(currentFilters);
    description.textContent = currentFilters.zip ?
      "Looking for " + (SPECIES[currentFilters.type] || "pets").toLowerCase() + " near " + currentFilters.zip + ". Listings shown here are limited to the feed's participating U.S. shelters." :
      "A live preview of adoptable " + (SPECIES[currentFilters.type] || "pets").toLowerCase() + " from our currently covered U.S. shelters.";
    getPage(false);
    if (opts && opts.scroll) results.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  moreButton.addEventListener("click", function () { if (hasMore && currentFilters) { moreButton.disabled = true; getPage(true); } });
  document.getElementById("showNational").addEventListener("click", function () {
    var filters = Object.assign({}, currentFilters || {}, { zip: "" });
    document.getElementById("zip").value = "";
    search(filters, { scroll: true });
  });
  document.getElementById("petDetailsClose").addEventListener("click", function () { detailDialog.close(); });
  detailDialog.addEventListener("click", function (event) { if (event.target === detailDialog) detailDialog.close(); });

  window.PetPickerResults = { search: search, normalize: normalize, extractPets: extractPets, buildQuery: buildQuery };
  persistSavedPets();
  search({ type: "dog", zip: "", age: "", size: "", gender: "" });
}());