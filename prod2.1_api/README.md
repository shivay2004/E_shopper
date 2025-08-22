# prod2.1_api — Static e‑commerce (vanilla JS) with mock API

A compact, interview‑friendly e‑commerce front end implemented with plain HTML, CSS and JavaScript and seeded with `db.json` to simulate product data and order flows. The project is intended as a demonstrator of core front‑end skills: DOM-driven rendering, client-side state (cart), form validation, and how a front-end integrates with a mock REST API (json-server).

This README follows the Auth‑Demo style: clean feature list, API/data surface, clear run steps, and resume‑ready bullets.

## What this project demonstrates

- Product listing & detail pages rendered from JSON data
- Client-side cart with add/update/remove and localStorage persistence
- Demo checkout flow (form validation + order POST when json-server is used)
- Easy-to-read, small JS modules suitable for quick code walkthroughs in interviews

## Key features (quick)

- Product catalog

  - Static JSON (`db.json`) drives product listing and detail pages.
  - Readable render functions in `prodlist.js` / `shop.js` that map JSON → DOM.

- Cart & checkout

  - Add to cart, edit quantities, remove items, and compute totals in `cart.js`.
  - Cart state persisted to `localStorage` for session continuity.

- Mock backend integration

  - `db.json` acts as seeded data; use `json-server` to expose REST endpoints (`/products`, `/orders`) for more realistic testing.

- UX & resilience
  - Responsive CSS, lightweight client-side validation on checkout, and small utilities in `script.js` for notifications and DOM helpers.

## Important files (where reviewers should look)

- `index.html` — landing / home (catalog overview)
- `shop.js` / `prodlist.js` — product list rendering and client-side filters
- `detail.html` / `detail.js` (if present) — single product rendering and Add to Cart handler
- `cart.html` / `cart.js` — cart manipulation (add/update/remove), totals calculation, `saveCart()`
- `checkout.html` / `checkout.js` — checkout form and demo order submission
- `db.json` — seeded product data used by the front end or json-server
- `script.js` — shared helpers (DOM utilities, simple notifications)

Notes: If you want code snippets embedded for quick reviewer reference, I can insert a `README.snippets.md` that highlights `addToCart`, `updateQuantity`, and the order POST.

## Typical user flow (resume‑friendly)

1. Home / Catalog — visitor opens `index.html`, sees featured products and quick filters.
2. Browse & Select — user clicks a product to open the detail view.
3. Product Detail — user selects options (if available) and clicks Add to Cart.
4. Cart Management — cart updates instantly in the UI; user can change quantities or remove items (state stored in `localStorage`).
5. Checkout — user completes the checkout form; with `json‑server` running a POST to `/orders` is simulated; otherwise a confirmation UI is shown.

This flow is optimized for demoing core front-end competencies during interviews and for extracting short resume bullets.

## API and data

- Base (mock) URL when using json-server: `http://localhost:3000`
- Data source: `db.json` at the project root (open to inspect product shape)
- Common endpoints (when json-server is running):
  - `GET /products` — product listing
  - `GET /products/:id` — product details
  - `POST /orders` — demo order submission

Implementation note: the front-end uses relative fetch calls to `db.json` by default. Running `json-server` will make endpoints available at `http://localhost:3000` and allows replacing local fetches with REST calls for fuller integration testing.

## Loading & failure UX

- When loading `db.json` via fetch, the UI shows simple placeholders (skeleton cards or "loading..." text) until the product array is available.
- Fetch failures (network or CORS when using file://) are handled with a friendly message and a fallback to an empty product list.

## Run locally (PowerShell)

Follow these steps from the project root:

1. Optional: serve static files locally (recommended over file://)

```powershell
cd "C:\Users\shiva\OneDrive\Desktop\ciphrix_projects\prod2.1_api"
# quick static server using Python
python -m http.server 3000
# visit: http://localhost:3000
```

2. Optional: start a mock REST API with json-server (recommended for order POSTs)

```powershell
# install once (global or dev-dependency)
npm install --global json-server
# or: npm i -D json-server

# run json-server to expose db.json
npx json-server --watch db.json --port 3000
# API: http://localhost:3000/products  and POST /orders
```

Notes:

- If you're using `python -m http.server` on 3000, either run json-server on a different port (e.g. 3001) or run json-server only and serve static files with another simple server; update the front-end URLs accordingly.
- If the browser blocks fetch from file://, use the static server command above.

## Resume‑ready bullets (copy/paste)

- Built a static e‑commerce frontend (HTML/CSS/Vanilla JS) featuring product listing, a persistent client-side cart, and demo checkout flows backed by a seeded `db.json` mock API.
- Implemented robust cart logic (add/update/remove, totals, persistence via localStorage) and modular product rendering (separable functions in `prodlist.js` / `shop.js`) for quick code walkthroughs.
- Integrated with `json-server` to simulate REST endpoints and demonstrate full front‑end → mock‑API interaction (GET /products, POST /orders).

## Suggested improvements / next steps

- Extract a small `api.js` fetch wrapper to centralize endpoints and error handling.
- Add unit tests for cart logic (Jest + jsdom) to validate `addToCart`, `updateQuantity` and total calculations.
- Add screenshots or a GIF in `/screenshots` and reference them in this README for visual proof in your portfolio.
- Optionally convert to a tiny SPA (Vite + vanilla JS or basic React) to show routing and componentization.

## Troubleshooting

- Blank page / no products: run a local HTTP server (see Run locally) because many browsers block fetch() from file:// URLs.
- json-server port conflict: use `--port <n>` and update front-end calls if you change the port.

---

If you'd like, I can now:

- extract specific code snippets (`addToCart`, `updateQuantity`, `saveCart`) into a small `README.snippets.md` for reviewers, or
- create a one‑page `projects_for_resume.md` summarizing this and other projects for quick resume copy/paste, or
- initialize a git repo in this folder and commit the README for you.

Please tell me which next step you want and I'll proceed.
