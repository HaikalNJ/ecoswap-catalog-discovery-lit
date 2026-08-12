# EcoSwap Catalog & Discovery Microfrontend

EcoSwap is the **Catalog & Discovery** part of a second-hand marketplace. It is
built with **Lit**, **Web Components**, **Vite**, and **Material Web**.

This repository is intentionally independent from the Cart and Account
microfrontends. It can run and deploy on its own.

## What it includes

- Responsive home page
- Product categories and featured products
- Product listing page
- Search by name, category, condition, or description
- Category and condition filters
- Price and name sorting
- Pagination
- Product detail page with image gallery
- Suggested products
- Wishlist buttons
- Add-to-cart events and local cart counter
- Hash-based routes that work after page refresh
- Custom events and an iframe `postMessage` bridge for shell integration

## Run the project

Install Node.js first. Then open a terminal inside this project folder and run:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```

Keep the terminal open while using the site. Press `Ctrl + C` only when you
want to stop it.

## Production build

```bash
npm run build
npm run preview
```

Vite places the production files in `dist/`. Deploy that folder with a static
hosting service such as Vercel, Netlify, or GitHub Pages.

## Exposed routes

| Route | Purpose |
| --- | --- |
| `#/` | Home page |
| `#/products` | All products |
| `#/products?search=camera` | Search results |
| `#/products?category=Electronics` | Products from one category |
| `#/products/1` | Product detail page |

## Exposed custom events

All events bubble and use `composed: true`, so a shell can listen for them
outside the component's Shadow DOM.

| Event | Detail | Receiver |
| --- | --- | --- |
| `catalog:add-to-cart` | `{ product, productId, quantity }` | Cart microfrontend |
| `catalog:wishlist-toggle` | `{ product, productId, favorite }` | Account microfrontend |
| `catalog:contact-seller` | `{ productId, seller }` | Account/message feature |
| `catalog:navigate` | `{ page: "cart" | "account" }` | Shell router |

Example:

```js
document.addEventListener("catalog:add-to-cart", (event) => {
  console.log(event.detail);
});
```

## iframe integration

The recommended beginner-friendly integration is an iframe. When the Catalog
runs inside an iframe, it also sends the same actions to its parent window:

```js
window.addEventListener("message", (event) => {
  if (event.data?.source !== "ecoswap-catalog") {
    return;
  }

  console.log(event.data.type, event.data.detail);
});
```

For a real deployment, the shell should verify `event.origin`, and the Catalog
should replace `"*"` in `postMessage` with the shell's exact origin.

## Project structure

```text
src/
├── catalog-app.js
├── components/
│   ├── product-card.js
│   ├── product-detail.js
│   └── product-listing.js
└── data/
    └── products.js
docs/
├── EcoSwap_Architecture_Diagram.svg
├── integration-notes.md
├── PROJECT_EXPLANATION_AR.md
└── shell-example.html
```

## Architecture choice

`catalog-app` is a Web Component. Lit creates the component and Shadow DOM,
which keeps its styles isolated. For the first group integration, iframe
composition is the simplest option because all three live URLs remain fully
independent. Communication uses `postMessage`.

The architecture diagram is available in:

```text
docs/EcoSwap_Architecture_Diagram.svg
```

## Items the group must still supply

This repository completes the Catalog member's work. The final group
submission still needs:

- The other members' Cart and Account repository URLs
- All three live component URLs
- The shell repository and live URL
- The final framework choices for the other two members
- The final allowed shell origin in the `postMessage` code

## Live URL

Add the deployed Catalog URL here before submission:

```text
Catalog live URL: ______________________________
```
