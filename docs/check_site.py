"""Minimal standard-library smoke checks for the static Pet Picker site."""
from html.parser import HTMLParser
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.refs = []
        self.images = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("href"):
            self.refs.append(attrs["href"])
        if tag == "img":
            self.images.append((attrs.get("src"), attrs.get("alt")))
        if tag in ("script", "link"):
            target = attrs.get("src") or attrs.get("href")
            if target and not target.startswith(("http://", "https://", "data:")):
                self.refs.append(target)

html = (ROOT / "index.html").read_text(encoding="utf-8")
page = Links()
page.feed(html)
required = {"petSearch", "zip", "zipError", "savedDialog", "savedList", "savedCount",
            "openSaved", "saveSearch", "closeSaved", "savedExplore", "year", "toast",
            "menuToggle", "mobileNav", "results", "resultsGrid", "resultsStatus",
            "resultsMore", "loadMorePets", "resultsEmpty", "petDetailsDialog",
            "petDetailsClose", "petDetailBody", "resultsPetfinder", "emptyPetfinder"}
assert required <= page.ids, f"Missing interactive IDs: {required - page.ids}"
for link in page.refs:
    if link.startswith("#"):
        assert link[1:] in page.ids, f"Broken anchor: {link}"
    elif not link.startswith(("http://", "https://", "mailto:", "data:")):
        assert (ROOT / link).is_file(), f"Missing local resource: {link}"
for source, alt in page.images:
    assert alt, f"Missing image alt: {source}"
    assert (ROOT / source).is_file(), f"Missing image: {source}"
assert (ROOT / "app.js").is_file() and (ROOT / "styles.css").is_file()
assert len(page.images) >= 4
print(f"Pet Picker static smoke checks passed: {len(page.images)} images, {len(page.refs)} links checked.")
