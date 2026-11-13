(function () {
  "use strict";
  var KEY = "petpicker.saved-searches.v1";
  var form = document.getElementById("petSearch");
  var zip = document.getElementById("zip");
  var error = document.getElementById("zipError");
  var dialog = document.getElementById("savedDialog");
  var list = document.getElementById("savedList");
  var count = document.getElementById("savedCount");
  var toast = document.getElementById("toast");
  var toastTimer;
  var pets = {
    dog: { slug: "dogs-for-adoption", name: "Dogs" },
    cat: { slug: "cats-for-adoption", name: "Cats" },
    rabbit: { slug: "rabbits-for-adoption", name: "Rabbits" },
    "small-and-furry": { slug: "small-and-furry-for-adoption", name: "Small pets" },
    bird: { slug: "birds-for-adoption", name: "Birds" },
    horse: { slug: "horses-for-adoption", name: "Horses" }
  };
  function loadSaved() {
    try {
      var value = JSON.parse(window.localStorage.getItem(KEY) || "[]");
      return Array.isArray(value) ? value.filter(function (entry) {
        return entry && typeof entry === "object" && Object.prototype.hasOwnProperty.call(pets, entry.type);
      }).slice(0, 30) : [];
    } catch (e) { return []; }
  }
  var saved = loadSaved();
  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3200);
  }
  function getFilters() {
    var data = new FormData(form);
    return {
      type: String(data.get("type") || "dog"),
      zip: String(data.get("zip") || "").trim(),
      age: String(data.get("age") || ""),
      size: String(data.get("size") || ""),
      gender: String(data.get("gender") || "")
    };
  }
  function validate(filters) {
    var okay = filters.zip === "" || /^\d{5}$/.test(filters.zip);
    error.hidden = okay;
    zip.setAttribute("aria-invalid", String(!okay));
    if (!okay) zip.focus();
    return okay;
  }
  function buildUrl(filters) {
    var pet = pets[filters.type] || pets.dog;
    var params = new URLSearchParams();
    if (/^\d{5}$/.test(filters.zip || "")) {
      params.set("postal_code", filters.zip);
      params.set("distance", "100");
    }
    ["age", "size", "gender"].forEach(function (key) {
      if (filters[key] && /^[a-z]+$/.test(filters[key])) params.append(key + "[]", filters[key]);
    });
    return "https://www.petfinder.com/search/" + pet.slug + "/anywhere/" + (params.toString() ? "?" + params.toString() : "");
  }
  function signature(item) {
    return [item.type, item.zip, item.age, item.size, item.gender].join("|");
  }
  function label(item) {
    var parts = [];
    if (/^\d{5}$/.test(item.zip || "")) parts.push("Near " + item.zip);
    if (item.age) parts.push(item.age);
    if (item.size) parts.push(item.size);
    if (item.gender) parts.push(item.gender);
    return parts.length ? parts.join(" · ") : "Any age and size · Anywhere";
  }
  function launch(filters) {
    // A user-initiated navigation preserves this page while searching live listings.
    var link = document.createElement("a");
    link.href = buildUrl(filters);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.append(link);
    link.click();
    link.remove();
  }
  function drawSaved() {
    list.replaceChildren();
    if (!saved.length) {
      var blank = document.createElement("div"); blank.className = "saved-empty";
      var heart = document.createElement("span"); heart.setAttribute("aria-hidden", "true"); heart.textContent = "♡";
      var title = document.createElement("h3"); title.textContent = "Nothing saved yet.";
      var note = document.createElement("p"); note.textContent = "Save your favorite search settings to pick up right where you left off.";
      blank.append(heart, title, note); list.append(blank);
      return;
    }
    saved.forEach(function (item, index) {
      var card = document.createElement("div"); card.className = "saved-item";
      var copy = document.createElement("div");
      var title = document.createElement("h3"); title.textContent = pets[item.type].name;
      var description = document.createElement("p"); description.textContent = label(item);
      copy.append(title, description);
      var actions = document.createElement("div"); actions.className = "saved-item-actions";
      var open = document.createElement("button"); open.className = "saved-open"; open.type = "button"; open.textContent = "↗";
      open.setAttribute("aria-label", "Open " + pets[item.type].name + " search on Petfinder");
      open.addEventListener("click", function () { launch(item); });
      var remove = document.createElement("button"); remove.className = "saved-remove"; remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", "Remove saved search");
      remove.addEventListener("click", function () { saved.splice(index, 1); persist(); notify("Saved search removed."); });
      actions.append(open, remove); card.append(copy, actions); list.append(card);
    });
  }
  function persist() {
    try { window.localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* Private browsing may block storage. */ }
    count.textContent = String(saved.length);
    drawSaved();
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var filters = getFilters();
    if (!validate(filters)) return;
    if (window.PetPickerResults && typeof window.PetPickerResults.search === "function") {
      window.PetPickerResults.search(filters, { scroll: true });
    } else {
      launch(filters);
    }
  });
  zip.addEventListener("input", function () { if (!error.hidden) validate(getFilters()); });
  document.getElementById("saveSearch").addEventListener("click", function () {
    var filters = getFilters();
    if (!validate(filters)) return;
    if (saved.some(function (item) { return signature(item) === signature(filters); })) {
      notify("This search is already saved.");
      return;
    }
    saved.unshift(filters);
    saved = saved.slice(0, 30);
    persist();
    notify("Search saved in this browser ♥");
  });
  document.getElementById("openSaved").addEventListener("click", function () {
    drawSaved();
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
  });
  document.getElementById("closeSaved").addEventListener("click", function () { dialog.close(); });
  document.getElementById("savedExplore").addEventListener("click", function () {
    dialog.close();
    document.getElementById("find").scrollIntoView({ behavior: "smooth" });
  });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll("[data-type]").forEach(function (button) {
    button.addEventListener("click", function () {
      var selected = form.querySelector('input[name="type"][value="' + button.dataset.type + '"]');
      if (selected) selected.checked = true;
      document.getElementById("find").scrollIntoView({ behavior: "smooth" });
      notify("Great choice. Add your ZIP code or browse anywhere.");
    });
  });
  var menu = document.getElementById("menuToggle");
  var nav = document.getElementById("mobileNav");
  menu.addEventListener("click", function () {
    var isOpen = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!isOpen));
    menu.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    nav.hidden = isOpen;
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.hidden = true;
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
    });
  });
  document.getElementById("year").textContent = String(new Date().getFullYear());
  window.PetPickerDirectory = { buildUrl: buildUrl, getFilters: getFilters };
  persist();
}());