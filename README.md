# Tales N Tools

Small fiction publisher site scaffold for "Tales N Tools". The site presents a catalog of fiction titles and a small tools section (the Authors Toolbox) with utilities for authors.

Files added

- `index.html` — main page (catalog, authors, tools, about, contact)
- `css/styles.css` — styles (bookish typography, warm paper background)
- `js/script.js` — small interaction (mobile nav + year)
- `assets/favicon.svg` — small favicon

How to run

Open `index.html` in your browser for a quick local preview. Note: the header include uses fetch(), which is blocked in many browsers when opening files via the `file://` scheme. For reliable results run a local HTTP server.

From PowerShell you can run the included helper script (project root):

```powershell
# start the local server (defaults to port 8000)
.\start-server.ps1
# then open http://localhost:8000 in your browser
```

Alternative (if you have Python installed):

```powershell
# from project root
# python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes and next steps

- Replace placeholder catalog entries with your real book pages, descriptions, and buy links.
- Add author pages under `#authors` and sample chapters or EPUB files.
- The Authors Toolbox is currently listed in the hero — I can add separate tool pages or a small demo flow.

If you'd like, I can add Google Fonts (serif for body/headings, mono for code), a proper logo, or set up GitHub Pages deployment.

Current changes in this iteration:

- Added an `authors/` directory with author pages and an authors index.
- Added a `tools/` page with a tiny Authors Toolbox demo (client-side manuscript formatter).
- Included Google Fonts (Merriweather for headings, Inter for UI, JetBrains Mono for code) in `index.html` head.
 - Renamed the homepage "Catalog" to a dedicated "Tales" page and added `tales/index.html` as the catalog page.

---
Generated on: 2025-10-28
