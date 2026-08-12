import { LitElement, html, css } from "lit";

import "@material/web/button/outlined-button.js";
import "@material/web/checkbox/checkbox.js";
import "@material/web/icon/icon.js";

import { products, categories, conditions } from "../data/products.js";
import "./product-card.js";

const productsPerPage = 8;

class ProductListing extends LitElement {
  static properties = {
    searchTerm: { type: String },
    initialCategory: { type: String },
    favoriteIds: { attribute: false },
    selectedCategory: { state: true },
    selectedCondition: { state: true },
    sortOrder: { state: true },
    currentPage: { state: true }
  };

  constructor() {
    super();

    this.searchTerm = "";
    this.initialCategory = "All Categories";
    this.favoriteIds = new Set();
    this.selectedCategory = "All Categories";
    this.selectedCondition = "All Conditions";
    this.sortOrder = "newest";
    this.currentPage = 1;
  }

  connectedCallback() {
    super.connectedCallback();
    this.selectedCategory = this.initialCategory || "All Categories";
  }

  updated(changedProperties) {
    if (
      changedProperties.has("initialCategory") &&
      changedProperties.get("initialCategory") !== undefined
    ) {
      this.selectedCategory = this.initialCategory || "All Categories";
      this.currentPage = 1;
    }

    if (
      changedProperties.has("searchTerm") &&
      changedProperties.get("searchTerm") !== undefined
    ) {
      this.currentPage = 1;
    }
  }

  get visibleProducts() {
    const searchText = this.searchTerm.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      const categoryMatches =
        this.selectedCategory === "All Categories" ||
        product.category === this.selectedCategory;

      const conditionMatches =
        this.selectedCondition === "All Conditions" ||
        product.condition === this.selectedCondition;

      const searchMatches =
        searchText === "" ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.condition.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      return categoryMatches && conditionMatches && searchMatches;
    });

    return [...filteredProducts].sort((first, second) => {
      if (this.sortOrder === "price-low") {
        return first.price - second.price;
      }

      if (this.sortOrder === "price-high") {
        return second.price - first.price;
      }

      if (this.sortOrder === "name") {
        return first.name.localeCompare(second.name);
      }

      return second.id - first.id;
    });
  }

  get totalPages() {
    return Math.max(
      1,
      Math.ceil(this.visibleProducts.length / productsPerPage)
    );
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * productsPerPage;
    return this.visibleProducts.slice(start, start + productsPerPage);
  }

  selectCategory(category) {
    this.selectedCategory = category;
    this.currentPage = 1;
  }

  selectCondition(condition) {
    this.selectedCondition = condition;
    this.currentPage = 1;
  }

  changeSort(event) {
    this.sortOrder = event.target.value;
    this.currentPage = 1;
  }

  clearFilters() {
    this.selectedCategory = "All Categories";
    this.selectedCondition = "All Conditions";
    this.sortOrder = "newest";
    this.currentPage = 1;

    this.dispatchEvent(
      new CustomEvent("catalog:clear-search", {
        bubbles: true,
        composed: true
      })
    );
  }

  goToPage(page) {
    this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
    this.updateComplete.then(() => {
      this.shadowRoot
        ?.querySelector(".listing-header")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  static styles = css`
    :host {
      display: block;
      font-family: Roboto, Arial, sans-serif;
      color: #20231f;
      --md-sys-color-primary: #137c35;
    }

    * {
      box-sizing: border-box;
    }

    .listing {
      max-width: 1480px;
      margin: 0 auto;
      padding: 48px 28px 88px;
    }

    .layout {
      display: grid;
      grid-template-columns: 270px minmax(0, 1fr);
      gap: 34px;
      align-items: start;
    }

    aside {
      position: sticky;
      top: 20px;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .filter-card {
      padding: 22px;
      border: 1px solid #cbd8c8;
      border-radius: 18px;
      background: #ffffff;
    }

    .filter-card h2 {
      margin: 0 0 18px;
      font-size: 20px;
    }

    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 11px;
    }

    .filter-option {
      min-height: 34px;
      display: flex;
      align-items: center;
      gap: 9px;
      color: #343a33;
      font-size: 15px;
      cursor: pointer;
    }

    md-checkbox {
      --md-checkbox-selected-container-color: #49b657;
      --md-checkbox-selected-hover-container-color: #137c35;
      --md-checkbox-selected-focus-container-color: #137c35;
    }

    select {
      width: 100%;
      min-height: 48px;
      padding: 0 13px;
      border: 1px solid #aebdaa;
      border-radius: 10px;
      outline: none;
      background: #ffffff;
      color: #343a33;
      font-size: 15px;
      cursor: pointer;
    }

    select:focus {
      border: 2px solid #137c35;
    }

    .clear-button {
      width: 100%;
      margin-top: 16px;
    }

    .content-area {
      min-width: 0;
    }

    .listing-header {
      scroll-margin-top: 20px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 28px;
    }

    .title-group h1 {
      margin: 0 0 7px;
      font-size: clamp(32px, 4vw, 43px);
      font-weight: 500;
      line-height: 1.1;
    }

    .active-search {
      margin: 0;
      color: #5d675a;
      font-size: 14px;
    }

    .result-count {
      margin: 0;
      color: #5d675a;
      font-size: 15px;
      white-space: nowrap;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 22px;
    }

    .empty-message {
      grid-column: 1 / -1;
      display: grid;
      place-items: center;
      min-height: 300px;
      padding: 40px;
      border: 1px dashed #aebdaa;
      border-radius: 18px;
      background: #f8faf7;
      color: #5d675a;
      text-align: center;
    }

    .empty-message md-icon {
      margin-bottom: 12px;
      color: #789076;
      font-size: 46px;
    }

    .empty-message h2 {
      margin: 0 0 8px;
      color: #293029;
      font-size: 22px;
    }

    .empty-message p {
      margin: 0;
    }

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      margin-top: 38px;
    }

    .page-button {
      min-width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border: 1px solid #b9c7b5;
      border-radius: 999px;
      background: #ffffff;
      color: #293029;
      cursor: pointer;
    }

    .page-button:hover:not(:disabled) {
      border-color: #137c35;
      color: #137c35;
    }

    .page-button.active {
      border-color: #4ab458;
      background: #4ab458;
      color: #ffffff;
      font-weight: 700;
    }

    .page-button:disabled {
      cursor: not-allowed;
      opacity: 0.42;
    }

    @media (max-width: 1250px) {
      .product-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 960px) {
      .layout {
        grid-template-columns: 1fr;
      }

      aside {
        position: static;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      .sort-card {
        grid-column: 1 / -1;
      }

      .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 620px) {
      .listing {
        padding: 34px 16px 60px;
      }

      aside,
      .product-grid {
        grid-template-columns: 1fr;
      }

      .sort-card {
        grid-column: auto;
      }

      .listing-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .result-count {
        white-space: normal;
      }
    }
  `;

  render() {
    const visibleProducts = this.visibleProducts;
    const paginatedProducts = this.paginatedProducts;
    const categoryNames = [
      "All Categories",
      ...categories
        .filter((category) => category.name !== "All")
        .map((category) => category.name)
    ];

    return html`
      <section class="listing" aria-labelledby="listing-title">
        <div class="layout">
          <aside aria-label="Product filters">
            <div class="filter-card">
              <h2>Categories</h2>

              <div class="filter-options">
                ${categoryNames.map(
                  (category) => html`
                    <label class="filter-option">
                      <md-checkbox
                        .checked=${this.selectedCategory === category}
                        @change=${() => this.selectCategory(category)}
                      ></md-checkbox>
                      <span>${category}</span>
                    </label>
                  `
                )}
              </div>
            </div>

            <div class="filter-card">
              <h2>Condition</h2>

              <div class="filter-options">
                ${["All Conditions", ...conditions].map(
                  (condition) => html`
                    <label class="filter-option">
                      <md-checkbox
                        .checked=${this.selectedCondition === condition}
                        @change=${() => this.selectCondition(condition)}
                      ></md-checkbox>
                      <span>${condition}</span>
                    </label>
                  `
                )}
              </div>
            </div>

            <div class="filter-card sort-card">
              <h2>Sort By</h2>

              <select
                aria-label="Sort products"
                .value=${this.sortOrder}
                @change=${this.changeSort}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              <md-outlined-button
                class="clear-button"
                @click=${this.clearFilters}
              >
                <md-icon slot="icon">filter_alt_off</md-icon>
                Clear filters
              </md-outlined-button>
            </div>
          </aside>

          <div class="content-area">
            <div class="listing-header">
              <div class="title-group">
                <h1 id="listing-title">Explore Listings</h1>

                ${this.searchTerm
                  ? html`
                      <p class="active-search">
                        Results for “${this.searchTerm}”
                      </p>
                    `
                  : ""}
              </div>

              <p class="result-count" aria-live="polite">
                Showing ${visibleProducts.length} of ${products.length} items
              </p>
            </div>

            <div class="product-grid">
              ${paginatedProducts.length > 0
                ? paginatedProducts.map(
                    (product) => html`
                      <product-card
                        .product=${product}
                        .favorite=${this.favoriteIds.has(product.id)}
                      ></product-card>
                    `
                  )
                : html`
                    <div class="empty-message">
                      <div>
                        <md-icon>search_off</md-icon>
                        <h2>No products found</h2>
                        <p>Try another search or clear the selected filters.</p>
                      </div>
                    </div>
                  `}
            </div>

            ${visibleProducts.length > productsPerPage
              ? html`
                  <nav class="pagination" aria-label="Product pages">
                    <button
                      class="page-button"
                      aria-label="Previous page"
                      ?disabled=${this.currentPage === 1}
                      @click=${() => this.goToPage(this.currentPage - 1)}
                    >
                      <md-icon>chevron_left</md-icon>
                    </button>

                    ${Array.from(
                      { length: this.totalPages },
                      (_, index) => index + 1
                    ).map(
                      (page) => html`
                        <button
                          class=${
                            page === this.currentPage
                              ? "page-button active"
                              : "page-button"
                          }
                          aria-label="Page ${page}"
                          aria-current=${
                            page === this.currentPage ? "page" : "false"
                          }
                          @click=${() => this.goToPage(page)}
                        >
                          ${page}
                        </button>
                      `
                    )}

                    <button
                      class="page-button"
                      aria-label="Next page"
                      ?disabled=${this.currentPage === this.totalPages}
                      @click=${() => this.goToPage(this.currentPage + 1)}
                    >
                      <md-icon>chevron_right</md-icon>
                    </button>
                  </nav>
                `
              : ""}
          </div>
        </div>
      </section>
    `;
  }
}

if (!customElements.get("product-listing")) {
  customElements.define("product-listing", ProductListing);
}
