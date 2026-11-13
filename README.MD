# Pet Picker

A redesigned, mobile-first pet adoption discovery website.

## Live site

Once GitHub Pages is enabled, the public site is **https://wiilki.github.io/pet-picker/**.

## Features

- Responsive editorial layout with accessible keyboard navigation.
- Search dogs, cats, rabbits, small pets, birds, or horses.
- Filter by age, size, gender, and optional five-digit US ZIP code.
- Open matching live results on [Petfinder](https://www.petfinder.com/search/) without exposing API credentials.
- Save and reopen searches from local browser storage, without an account.
- Clearly distinguish illustrative animal photography from live adoption listings.

## Deploy

The production-ready static app is in `docs/`. The GitHub Actions workflow at `.github/workflows/publish-pages.yml` verifies and publishes it when `main` changes.

**One-time repository step:** Open **Settings → Pages → Build and deployment → Source → GitHub Actions**. GitHub Pages must be enabled for this repository; the workflow cannot turn it on without elevated Pages administration credentials.

Visit `https://wiilki.github.io/pet-picker/` after the Pages deployment job succeeds.

## Local development

From the repository root, run `python3 -m http.server 8000 --directory docs`, then visit `http://localhost:8000`.

The client-side code has no build or credentials requirement. Run `node --check docs/app.js` and `python3 docs/check_site.py` for basic validation.

## About the legacy code

The older React / Express / Apollo / MongoDB application remains preserved in `client/` and `server/`, but is **not** running on GitHub Pages. It depends on a separate deployed backend and Petfinder API credentials. GitHub Pages can host only the static front end; it cannot host MongoDB, Express, or a GraphQL server.

The new site uses Petfinder's public search pages for live results. Pet Picker is an independent discovery guide and is not affiliated with Petfinder. Saved preferences are local to each browser; no user account or animal inventory is implied.

## On-page live animal profiles (2026)

The adoption search now shows **live animal preview cards on Pet Picker itself**, with clickable full profiles, attributes, shelter information, original links, pagination, and browser-local favorite pets. The code in docs/results.js uses the public [Petnecto JSON API](https://petnecto.com/help/json-api), which requires no private key and permits cross-origin browser requests.

**Important coverage and photo limitations:**
- Current U.S. coverage in this live feed is limited to King County, Washington and Montgomery County, Maryland. Petfinder links remain available for broader and location-specific searches.
- Those U.S. sources have photo_rights set to link-out, so individual animal photos must be opened on the shelter pages. Each card provides a prominent View actual photo link rather than misrepresenting unrelated photos. The built-in gallery supports images when a source explicitly permits embedding via shelter-granted or open-licence rights.
- Availability and profile details belong to shelters and may change. This site does not process adoptions or claim a Petfinder affiliation.
- Preferences and saved pet references are kept in this browser only. Saved profiles can become outdated.

### Development checks

- JS syntax: node --check docs/app.js && node --check docs/results.js
- Static HTML/resource checks: python3 docs/check_site.py
- DOM behavior test: npm install --no-save jsdom@26 && node docs/test_results.cjs

The GitHub Pages workflow runs UI and static checks before deploying the main branch.
