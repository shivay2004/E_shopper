# React E‑Shop — Vite + React storefront

A responsive e‑commerce front-end demonstrating a complete front‑end shopping experience: product discovery, product detail and variant selection, cart management and a demo checkout flow. This README follows the Auth Demo layout and is tailored for resume/portfolio use.

## Features

- Product discovery

  - Home hero carousel, promotional banners, category grid and vendor carousel to highlight products and offers.
  - Implementations: accessible slider with autoplay/controls, lazy-loaded images and responsive breakpoints.

- Product catalog & filtering

  - Card-based product grid, client-side filtering/sorting and quick-add buttons for instant cart interactions.
  - Implementations: reusable `ProductCard` component, client-side filter state and optimized list rendering.

- Product detail & variants

  - Image gallery/slider, variant selectors (size/color) that update price and image, and related products.
  - Implementations: gallery component, variant-driven UI updates and add-to-cart validation.

- Cart & checkout flow

  - Persistent client-side cart (add/update/remove), header cart preview, and a lightweight checkout screen (demo only).
  - Implementations: cart context/localStorage persistence, form validation and order confirmation mock.

- Reviews, offers & vendor showcase

  - Review/testimonial section, offer banners and vendor logo carousel to improve credibility and cross-sell.

- Componentization & Dev DX

  - Component-driven architecture (Header, Footer, ProductCard, Slider, CategoryGrid, etc.) and seeded `src/db.json` for development.

- Mock API & data

  - `src/db.json` contains product and vendor data; optional `json-server` can expose REST endpoints for integration testing.

- Performance & UX

  - Lazy-loading for images, skeleton placeholders for loading states, and responsive images to improve perceived performance.

- Accessibility
  - Semantic HTML, descriptive `alt` attributes, and ARIA where applicable for interactive controls.

## Tech stack

- Frontend: React, Vite
- Routing: React Router (if routes are used in `src/main.jsx`)
- State: Context API or Redux (check `src` for implementation)
- Styling: CSS modules / global CSS (project uses component-level styling)
- Dev API: json-server (optional) using `src/db.json`

See `package.json` (if present) for exact package versions.

## API & Data (mock)

This project ships with a seeded `src/db.json` file. Run an optional mock API with json-server:

```powershell
# from project root
npx json-server --watch src/db.json --port 3000
```

Common endpoints you can expose:

- `GET /products` — list products
- `GET /products/:id` — get product details
- `POST /orders` — submit demo order

If the app imports `src/db.json` directly, json-server is not required.

## Loading states & UX

Components render skeleton placeholders while data loads. Typical patterns:

- Product lists show grid skeletons until product data is available.
- Product detail shows image skeletons and placeholder text until the product loads.
- Cart interactions are optimistic: UI updates immediately; server calls (if any) mimic latency with a short delay.

## Project structure (high level)

- `index.html` — app entry (Vite)
- `src/main.jsx` — app bootstrap and router
- `src/pages/` — page-level components (Home, ProductList, ProductDetail, Cart)
- `src/components/` — UI building blocks (ProductCard, Slider, VendorCarousel, ReviewSection)
- `src/db.json` — mock product/vendor data

Point reviewers to the above files when sharing code samples.

## Run locally (PowerShell)

1. Install dependencies and start the dev server

```powershell
cd "C:\Users\shiva\OneDrive\Desktop\ciphrix_projects\react_test\react_test1"
npm install
npm run dev
```

2. (Optional) Start the mock API

```powershell
npx json-server --watch src/db.json --port 3000
```

Notes:

- If fetch calls target `http://localhost:3000`, run json-server. If the app imports JSON directly, skip json-server.
- If ports conflict, change the port in the json-server command or update the base URL in your API helper.

## Useful scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally

## What to highlight on your resume

- Built a responsive Vite + React storefront with componentized ProductCard, image carousels, client-side cart and a mock REST API for development.
- Implemented end-to-end front-end UX including discovery (carousel, categories), browse (filters), product evaluation (gallery + variants), cart management and a demo checkout flow.

Resume-ready one-liner (copy/paste):

> React E‑Shop — Implemented a responsive Vite + React storefront with product discovery, dynamic product detail pages, a persisted client-side cart and mocked API endpoints for development.

Longer portfolio blurb:

Componentized e‑commerce front-end showcasing discovery, product detail, cart workflows and checkout interactions; used a seeded JSON dataset (`src/db.json`) with optional `json-server` to simulate real API integration.

## Suggested README improvements / next steps

1. Add screenshots or a demo GIF (create `screenshots/` and reference images).
2. Extract exact package versions from `package.json` and add a Tech table.
3. Add basic unit tests for `ProductCard` and `Cart` using React Testing Library.
4. Add `DEPLOY.md` with Vercel/Netlify instructions and a note about replacing json-server for production.

## Troubleshooting

- Images not loading? Verify `src/img` paths and Vite asset prefixes.
- Dev server errors? Run `npm install` and check console for missing deps.

---

If you want, I can:

- insert the resume one-liners at the top of the file for quick copy-paste, or
- extract package versions and append a Tech table (I will read `package.json`), or
- add screenshot placeholders and update the README to reference them.

Which would you like me to do next?
