# EcoSwap - Catalog & Discovery

## About the project

This project is my part of the EcoSwap group project. EcoSwap is a simple
marketplace for buying and selling second-hand items.

My role is **Catalog & Discovery**, so I worked on the pages that allow the
user to view products, search for an item, use filters, and open product
details.

I used **Lit** to build the project as reusable Web Components. I also used
Material Web for interface elements and Vite to run and build the project.

## Main features

- Home page with categories and featured products
- Page that shows all products
- Search by product name or description
- Filter by category and condition
- Sort products by price or name
- Simple pagination
- Product details page
- Suggested products
- Favorite button
- Add to cart button with a local counter
- Responsive design for desktop and mobile

The products in this project are sample data stored in a JavaScript file. A
backend or database was not required for my part.

## Technologies used

- Lit
- JavaScript
- HTML and CSS
- Material Web
- Vite

## How to run the project

First, Node.js must be installed. Open the project folder in VS Code and run:

```bash
npm install
npm run dev
```

Vite will show a local link, usually:

```text
http://localhost:5173/
```

Keep the terminal open while using the website. To stop the project, press
`Ctrl + C`.

## Main routes

| Route | Page |
| --- | --- |
| `#/` | Home page |
| `#/products` | All products |
| `#/products?search=camera` | Search results |
| `#/products?category=Electronics` | Products from one category |
| `#/products/1` | Product details |

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
```

- `catalog-app.js` is the main component and controls navigation.
- `product-card.js` displays one product card.
- `product-listing.js` contains search, filters, sorting, and pagination.
- `product-detail.js` displays the details of one product.
- `products.js` contains the sample product data.

## Connection with the other microfrontends

The Catalog is an independent microfrontend, so it can run and deploy by
itself. The group shell can display it using an iframe.

I used simple custom events for actions that belong to other parts of the
system:

| Event | Purpose |
| --- | --- |
| `catalog:add-to-cart` | Sends a selected product to the Cart part |
| `catalog:wishlist-toggle` | Sends a favorite action to the Account part |
| `catalog:contact-seller` | Sends the selected seller information |
| `catalog:navigate` | Asks the group shell to open another page |

When the project is used inside an iframe, it also sends these actions to the
parent page using `postMessage`.

## Production build

To check the final production version, run:

```bash
npm run build
npm run preview
```

The build files are generated inside the `dist` folder.

## Project links

- GitHub: https://github.com/HaikalNJ/ecoswap-catalog-discovery-lit
- Live website: https://ecoswap-catalog-discovery-lit.netlify.app/

## My role

```text
Role: Catalog & Discovery
Framework: Lit
Material library: Material Web
```
