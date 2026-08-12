import { LitElement, html, css } from "lit";
import "material-symbols/outlined.css";

import "@material/web/iconbutton/icon-button.js";
import "@material/web/icon/icon.js";

import { products, categories, findProduct } from "./data/products.js";
import "./components/product-card.js";
import "./components/product-listing.js";
import "./components/product-detail.js";

class CatalogApp extends LitElement {
  static properties = {
    currentPage: { state: true },
    selectedProduct: { state: true },
    searchTerm: { state: true },
    categoryFilter: { state: true },
    cartCount: { state: true },
    favoriteIds: { state: true },
    toastMessage: { state: true }
  };

  constructor() {
    super();

    this.currentPage = "home";
    this.selectedProduct = null;
    this.searchTerm = "";
    this.categoryFilter = "All Categories";
    this.cartCount = 0;
    this.favoriteIds = new Set();
    this.toastMessage = "";

    this.handleHashChange = this.handleHashChange.bind(this);
    this.toastTimer = null;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this.handleHashChange);
    this.handleHashChange();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.handleHashChange);
    window.clearTimeout(this.toastTimer);
    super.disconnectedCallback();
  }

  handleHashChange() {
    const rawHash = window.location.hash.slice(1) || "/";
    const [path, queryString = ""] = rawHash.split("?");
    const query = new URLSearchParams(queryString);

    if (path.startsWith("/products/")) {
      const productId = path.split("/")[2];
      const product = findProduct(productId);

      if (product) {
        this.selectedProduct = product;
        this.currentPage = "detail";
        return;
      }
    }

    if (path === "/products") {
      this.searchTerm = query.get("search") || "";
      this.categoryFilter = query.get("category") || "All Categories";
      this.selectedProduct = null;
      this.currentPage = "listings";
      return;
    }

    this.currentPage = "home";
    this.selectedProduct = null;
    this.searchTerm = "";
    this.categoryFilter = "All Categories";
  }

  makeListingsHash() {
    const query = new URLSearchParams();

    if (this.searchTerm.trim()) {
      query.set("search", this.searchTerm.trim());
    }

    if (this.categoryFilter !== "All Categories") {
      query.set("category", this.categoryFilter);
    }

    const queryString = query.toString();
    return `#/products${queryString ? `?${queryString}` : ""}`;
  }

  goToHash(hash) {
    if (window.location.hash === hash) {
      this.handleHashChange();
      return;
    }

    window.location.hash = hash.slice(1);
  }

  showHome() {
    this.goToHash("#/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  showListings() {
    this.searchTerm = "";
    this.categoryFilter = "All Categories";
    this.goToHash(this.makeListingsHash());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  showCategory(categoryName) {
    this.searchTerm = "";
    this.categoryFilter =
      categoryName === "All" ? "All Categories" : categoryName;
    this.goToHash(this.makeListingsHash());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleSearch(event) {
    this.searchTerm = event.target.value;
    this.categoryFilter = "All Categories";
    this.currentPage = "listings";
    this.selectedProduct = null;

    const nextHash = this.makeListingsHash();
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
    window.history.replaceState(null, "", nextUrl);
  }

  clearSearch() {
    this.searchTerm = "";
    this.categoryFilter = "All Categories";

    if (this.currentPage === "listings") {
      const nextUrl = `${window.location.pathname}${window.location.search}#/products`;
      window.history.replaceState(null, "", nextUrl);
    }
  }

  openProduct(event) {
    const product = event.detail?.product || event.detail;

    if (!product?.id) {
      return;
    }

    this.selectedProduct = product;
    this.goToHash(`#/products/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  backToListings() {
    this.goToHash(this.makeListingsHash());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleAddToCart(event) {
    const quantity = Number(event.detail?.quantity) || 1;
    const product = event.detail?.product;

    this.cartCount += quantity;
    this.showToast(`${product?.name || "Product"} added to cart`);
    this.postToShell("catalog:add-to-cart", event.detail);
  }

  handleWishlistToggle(event) {
    const productId = Number(event.detail?.productId);
    const favorite = Boolean(event.detail?.favorite);
    const nextFavorites = new Set(this.favoriteIds);

    if (favorite) {
      nextFavorites.add(productId);
    } else {
      nextFavorites.delete(productId);
    }

    this.favoriteIds = nextFavorites;
    this.showToast(
      favorite ? "Added to your wishlist" : "Removed from your wishlist"
    );
    this.postToShell("catalog:wishlist-toggle", event.detail);
  }

  handleContactSeller(event) {
    this.showToast(`Message request sent to ${event.detail?.seller}`);
    this.postToShell("catalog:contact-seller", event.detail);
  }

  requestExternalPage(page) {
    const detail = { page };

    this.dispatchEvent(
      new CustomEvent("catalog:navigate", {
        detail,
        bubbles: true,
        composed: true
      })
    );

    this.postToShell("catalog:navigate", detail);
    this.showToast(`${page === "cart" ? "Cart" : "Account"} is provided by another microfrontend`);
  }

  postToShell(type, detail) {
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          source: "ecoswap-catalog",
          type,
          detail
        },
        "*"
      );
    }
  }

  showToast(message) {
    this.toastMessage = message;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.toastMessage = "";
    }, 2600);
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #ffffff;
      color: #20231f;
      font-family: Roboto, Arial, sans-serif;
      --md-sys-color-primary: #137c35;
      --md-sys-color-on-primary: #ffffff;
      --md-sys-color-surface: #ffffff;
      --md-sys-color-on-surface: #20231f;
      --md-ref-typeface-brand: Roboto;
      --md-ref-typeface-plain: Roboto;
    }

    * {
      box-sizing: border-box;
    }

    .skip-link {
      position: fixed;
      top: -80px;
      left: 18px;
      z-index: 100;
      padding: 10px 15px;
      border-radius: 8px;
      background: #ffffff;
      color: #137c35;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
    }

    .skip-link:focus {
      top: 12px;
    }

    header {
      position: relative;
      z-index: 10;
      min-height: 78px;
      display: grid;
      grid-template-columns: 170px minmax(280px, 660px) 150px;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 10px max(24px, calc((100vw - 1450px) / 2));
      border-bottom: 1px solid #dfe5dc;
      background: rgba(255, 255, 255, 0.97);
    }

    .logo {
      width: max-content;
      padding: 8px 0;
      border: none;
      background: transparent;
      color: #087b2a;
      font: inherit;
      font-size: 27px;
      font-weight: 700;
      cursor: pointer;
    }

    .search-box {
      width: 100%;
      min-width: 0;
      height: 54px;
      display: flex;
      align-items: center;
      gap: 11px;
      padding: 0 17px;
      border: 1px solid #c4d0c1;
      border-radius: 999px;
      background: #ffffff;
      color: #5c6859;
      transition:
        border-color 150ms ease,
        box-shadow 150ms ease;
    }

    .search-box:hover {
      border-color: #779474;
    }

    .search-box:focus-within {
      border-color: #137c35;
      box-shadow: 0 0 0 1px #137c35;
    }

    .search-box md-icon {
      flex: 0 0 auto;
      font-size: 23px;
    }

    .search-box input {
      min-width: 0;
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      color: #2e352d;
      font: inherit;
      font-size: 16px;
    }

    .search-box input::placeholder {
      color: #778174;
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
    }

    .actions md-icon-button {
      --md-icon-button-icon-color: #354033;
    }

    .cart-wrapper {
      position: relative;
      display: inline-flex;
    }

    .cart-count {
      position: absolute;
      top: 0;
      right: 0;
      min-width: 19px;
      height: 19px;
      display: grid;
      place-items: center;
      padding: 0 5px;
      border: 2px solid #ffffff;
      border-radius: 999px;
      background: #c62828;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      pointer-events: none;
    }

    .home {
      padding: 52px 28px 82px;
    }

    .hero {
      min-height: 440px;
      max-width: 1400px;
      display: grid;
      place-items: center;
      margin: 0 auto;
      padding: 42px;
      overflow: hidden;
      border-radius: 20px;
      background-image:
        linear-gradient(rgba(10, 24, 13, 0.38), rgba(10, 24, 13, 0.38)),
        url("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=86");
      background-position: center;
      background-size: cover;
    }

    .hero-content {
      max-width: 820px;
      text-align: center;
    }

    .hero h1 {
      margin: 0 0 18px;
      color: #ffffff;
      font-size: clamp(43px, 6vw, 72px);
      font-weight: 400;
      line-height: 1.07;
      text-shadow: 0 2px 12px rgba(0, 0, 0, 0.28);
    }

    .hero p {
      max-width: 620px;
      margin: 0 auto;
      color: rgba(255, 255, 255, 0.92);
      font-size: 18px;
      line-height: 1.55;
    }

    .categories,
    .featured-products {
      max-width: 1400px;
      margin-right: auto;
      margin-left: auto;
    }

    .categories {
      margin-top: 52px;
    }

    .section-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 27px;
    }

    .section-heading h2 {
      margin: 0;
      font-size: 28px;
    }

    .view-all {
      padding: 8px 0;
      border: none;
      background: transparent;
      color: #137c35;
      font: inherit;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
    }

    .view-all:hover {
      text-decoration: underline;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(8, minmax(90px, 1fr));
      gap: 20px;
    }

    .category-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 0;
      border: none;
      background: transparent;
      color: #20231f;
      font: inherit;
      cursor: pointer;
    }

    .category-icon {
      width: 84px;
      height: 84px;
      display: grid;
      place-items: center;
      border: 1px solid transparent;
      border-radius: 50%;
      background: #f0f2ef;
      transition:
        transform 180ms ease,
        background 180ms ease,
        border-color 180ms ease;
    }

    .category-icon md-icon {
      font-size: 33px;
    }

    .category-name {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }

    .category-button:hover .category-icon,
    .category-button:focus-visible .category-icon {
      border-color: #9cbe99;
      background: #dff1e0;
      transform: translateY(-3px);
    }

    .category-button:focus-visible {
      outline: none;
    }

    .featured-products {
      margin-top: 64px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 22px;
    }

    .impact-strip {
      max-width: 1400px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      margin: 65px auto 0;
      overflow: hidden;
      border: 1px solid #d7e1d4;
      border-radius: 18px;
      background: #d7e1d4;
    }

    .impact-item {
      display: flex;
      align-items: center;
      gap: 13px;
      padding: 22px;
      background: #f5f8f3;
    }

    .impact-item md-icon {
      color: #137c35;
      font-size: 28px;
    }

    .impact-item strong,
    .impact-item span {
      display: block;
    }

    .impact-item span {
      margin-top: 3px;
      color: #657062;
      font-size: 13px;
    }

    footer {
      border-top: 1px solid #dfe5dc;
      background: #ffffff;
    }

    .footer-content {
      max-width: 1450px;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 50px;
      margin: 0 auto;
      padding: 52px 28px;
    }

    .footer-brand h2 {
      margin: 0 0 15px;
      color: #087b2a;
      font-size: 26px;
    }

    .footer-brand p {
      max-width: 340px;
      margin: 0;
      color: #606a5d;
      line-height: 1.6;
    }

    .footer-column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 13px;
    }

    .footer-column h3 {
      margin: 0 0 7px;
      font-size: 16px;
    }

    .footer-column button {
      padding: 0;
      border: none;
      background: transparent;
      color: #5b6658;
      font: inherit;
      cursor: pointer;
    }

    .footer-column button:hover {
      color: #137c35;
      text-decoration: underline;
    }

    .copyright {
      padding: 20px;
      border-top: 1px solid #dfe5dc;
      color: #606a5d;
      font-size: 14px;
      text-align: center;
    }

    .toast {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 50;
      max-width: min(380px, calc(100vw - 32px));
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 17px;
      border-radius: 12px;
      background: #263328;
      color: #ffffff;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
      animation: toast-in 180ms ease-out;
    }

    .toast md-icon {
      color: #8fe59a;
    }

    @keyframes toast-in {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 1050px) {
      .category-grid {
        grid-template-columns: repeat(4, 1fr);
        row-gap: 28px;
      }

      .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 720px) {
      header {
        grid-template-columns: 1fr auto;
        gap: 9px 12px;
        padding: 12px 16px;
      }

      .logo {
        font-size: 24px;
      }

      .search-box {
        grid-column: 1 / -1;
        grid-row: 2;
      }

      .home {
        padding: 30px 16px 60px;
      }

      .hero {
        min-height: 340px;
        padding: 28px;
        border-radius: 16px;
      }

      .hero p {
        font-size: 16px;
      }

      .category-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 23px 8px;
      }

      .category-icon {
        width: 64px;
        height: 64px;
      }

      .category-icon md-icon {
        font-size: 28px;
      }

      .category-name {
        font-size: 12px;
      }

      .impact-strip {
        grid-template-columns: 1fr;
      }

      .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: 35px;
        padding: 40px 20px;
      }

      .footer-brand {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 520px) {
      .product-grid,
      .footer-content {
        grid-template-columns: 1fr;
      }

      .footer-brand {
        grid-column: auto;
      }

      .toast {
        right: 16px;
        bottom: 16px;
        left: 16px;
      }
    }
  `;

  renderHome() {
    return html`
      <main class="home" id="main-content">
        <section class="hero" aria-labelledby="hero-title">
          <div class="hero-content">
            <h1 id="hero-title">Give pre-loved items a new home</h1>
            <p>
              Discover quality second-hand finds and make a more sustainable
              choice with every purchase.
            </p>
          </div>
        </section>

        <section class="categories" aria-labelledby="categories-title">
          <div class="section-heading">
            <h2 id="categories-title">Categories</h2>
          </div>

          <div class="category-grid">
            ${categories.map(
              (category) => html`
                <button
                  class="category-button"
                  type="button"
                  aria-label="Browse ${category.name}"
                  @click=${() => this.showCategory(category.name)}
                >
                  <span class="category-icon">
                    <md-icon>${category.icon}</md-icon>
                  </span>
                  <span class="category-name">${category.name}</span>
                </button>
              `
            )}
          </div>
        </section>

        <section class="featured-products" aria-labelledby="featured-title">
          <div class="section-heading">
            <h2 id="featured-title">Featured Products</h2>

            <button
              class="view-all"
              type="button"
              @click=${this.showListings}
            >
              View all
            </button>
          </div>

          <div class="product-grid">
            ${products
              .filter((product) => product.featured)
              .slice(0, 4)
              .map(
                (product) => html`
                  <product-card
                    .product=${product}
                    .favorite=${this.favoriteIds.has(product.id)}
                  ></product-card>
                `
              )}
          </div>
        </section>

        <section class="impact-strip" aria-label="EcoSwap benefits">
          <div class="impact-item">
            <md-icon>eco</md-icon>
            <div>
              <strong>Sustainable choices</strong>
              <span>Keep quality products in use for longer</span>
            </div>
          </div>

          <div class="impact-item">
            <md-icon>verified_user</md-icon>
            <div>
              <strong>Buyer protection</strong>
              <span>Shop second-hand with confidence</span>
            </div>
          </div>

          <div class="impact-item">
            <md-icon>local_shipping</md-icon>
            <div>
              <strong>Carbon-neutral delivery</strong>
              <span>Lower-impact shipping on every order</span>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  renderCurrentPage() {
    if (this.currentPage === "listings") {
      return html`
        <main id="main-content">
          <product-listing
            .searchTerm=${this.searchTerm}
            .initialCategory=${this.categoryFilter}
            .favoriteIds=${this.favoriteIds}
          ></product-listing>
        </main>
      `;
    }

    if (this.currentPage === "detail" && this.selectedProduct) {
      return html`
        <main id="main-content">
          <product-detail
            .product=${this.selectedProduct}
            .favorite=${this.favoriteIds.has(this.selectedProduct.id)}
            .favoriteIds=${this.favoriteIds}
          ></product-detail>
        </main>
      `;
    }

    return this.renderHome();
  }

  render() {
    return html`
      <a class="skip-link" href="#main-content">Skip to content</a>

      <header>
        <button class="logo" type="button" @click=${this.showHome}>
          EcoSwap
        </button>

        <label class="search-box">
          <md-icon>search</md-icon>
          <input
            type="search"
            placeholder="Search for sustainable finds..."
            aria-label="Search products"
            .value=${this.searchTerm}
            @input=${this.handleSearch}
          >
        </label>

        <div class="actions">
          <div class="cart-wrapper">
            <md-icon-button
              aria-label="Open shopping cart"
              @click=${() => this.requestExternalPage("cart")}
            >
              <md-icon>shopping_cart</md-icon>
            </md-icon-button>

            ${this.cartCount > 0
              ? html`
                  <span class="cart-count" aria-label="${this.cartCount} items">
                    ${this.cartCount}
                  </span>
                `
              : ""}
          </div>

          <md-icon-button
            aria-label="Open account"
            @click=${() => this.requestExternalPage("account")}
          >
            <md-icon>person</md-icon>
          </md-icon-button>
        </div>
      </header>

      <div
        @catalog:open-product=${this.openProduct}
        @catalog:add-to-cart=${this.handleAddToCart}
        @catalog:wishlist-toggle=${this.handleWishlistToggle}
        @catalog:back-to-listings=${this.backToListings}
        @catalog:clear-search=${this.clearSearch}
        @catalog:contact-seller=${this.handleContactSeller}
      >
        ${this.renderCurrentPage()}
      </div>

      <footer>
        <div class="footer-content">
          <div class="footer-brand">
            <h2>EcoSwap</h2>
            <p>
              The sustainable marketplace for quality second-hand goods. Buy
              and sell with confidence while reducing your carbon footprint.
            </p>
          </div>

          <div class="footer-column">
            <h3>Platform</h3>
            <button @click=${this.showHome}>Home</button>
            <button @click=${this.showListings}>Explore products</button>
          </div>

          <div class="footer-column">
            <h3>Support</h3>
            <button @click=${() => this.showToast("Help Center is coming soon")}>Help Center</button>
            <button @click=${() => this.showToast("Sustainability guide is coming soon")}>Sustainability</button>
          </div>

          <div class="footer-column">
            <h3>Account</h3>
            <button @click=${() => this.requestExternalPage("account")}>Profile</button>
            <button @click=${() => this.requestExternalPage("cart")}>Cart</button>
          </div>
        </div>

        <div class="copyright">
          © 2026 EcoSwap Marketplace. All rights reserved.
        </div>
      </footer>

      ${this.toastMessage
        ? html`
            <div class="toast" role="status" aria-live="polite">
              <md-icon>check_circle</md-icon>
              <span>${this.toastMessage}</span>
            </div>
          `
        : ""}
    `;
  }
}

if (!customElements.get("catalog-app")) {
  customElements.define("catalog-app", CatalogApp);
}
