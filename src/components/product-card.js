import { LitElement, html, css } from "lit";

import "@material/web/button/filled-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/icon/icon.js";

class ProductCard extends LitElement {
  static properties = {
    product: { attribute: false },
    favorite: { type: Boolean }
  };

  constructor() {
    super();
    this.product = null;
    this.favorite = false;
  }

  openProduct() {
    this.dispatchEvent(
      new CustomEvent("catalog:open-product", {
        detail: { product: this.product },
        bubbles: true,
        composed: true
      })
    );
  }

  handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.openProduct();
    }
  }

  addToCart(event) {
    event.stopPropagation();

    this.dispatchEvent(
      new CustomEvent("catalog:add-to-cart", {
        detail: {
          product: this.product,
          productId: this.product.id,
          quantity: 1
        },
        bubbles: true,
        composed: true
      })
    );
  }

  toggleFavorite(event) {
    event.stopPropagation();

    this.dispatchEvent(
      new CustomEvent("catalog:wishlist-toggle", {
        detail: {
          product: this.product,
          productId: this.product.id,
          favorite: !this.favorite
        },
        bubbles: true,
        composed: true
      })
    );
  }

  hideBrokenImage(event) {
    event.currentTarget.style.display = "none";
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: Roboto, Arial, sans-serif;
      --md-sys-color-primary: #137c35;
      --md-sys-color-on-primary: #ffffff;
    }

    * {
      box-sizing: border-box;
    }

    article {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #d5dfd2;
      border-radius: 18px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(27, 46, 29, 0.08);
      cursor: pointer;
      transition:
        transform 180ms ease,
        box-shadow 180ms ease,
        border-color 180ms ease;
    }

    article:hover,
    article:focus-visible {
      border-color: #96b794;
      outline: none;
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(27, 46, 29, 0.14);
    }

    .image-area {
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: #eff2ed;
    }

    .product-image {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      transition: transform 300ms ease;
    }

    article:hover .product-image {
      transform: scale(1.025);
    }

    .condition {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 6px 10px;
      border-radius: 8px;
      background: #87e690;
      color: #105e24;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }

    .favorite {
      position: absolute;
      top: 8px;
      right: 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      --md-icon-button-icon-color: #667064;
    }

    .favorite.active {
      --md-icon-button-icon-color: #c62828;
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 18px;
    }

    .category {
      margin: 0 0 7px;
      color: #6c7569;
      font-size: 12px;
      font-weight: 500;
    }

    h3 {
      margin: 0 0 9px;
      color: #20231f;
      font-size: 19px;
      line-height: 1.3;
    }

    .description {
      display: -webkit-box;
      margin: 0 0 18px;
      overflow: hidden;
      color: #5a6357;
      font-size: 14px;
      line-height: 1.5;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
    }

    .price {
      color: #137c35;
      font-size: 22px;
      font-weight: 700;
      white-space: nowrap;
    }

    md-filled-button {
      --md-filled-button-container-height: 42px;
      --md-filled-button-container-shape: 999px;
    }

    @media (max-width: 420px) {
      .content {
        padding: 15px;
      }

      h3 {
        font-size: 17px;
      }
    }
  `;

  render() {
    if (!this.product) {
      return html``;
    }

    return html`
      <article
        tabindex="0"
        aria-label="Open ${this.product.name} details"
        @click=${this.openProduct}
        @keydown=${this.handleKeydown}
      >
        <div class="image-area">
          <img
            class="product-image"
            src=${this.product.image}
            alt=${this.product.name}
            loading="lazy"
            @error=${this.hideBrokenImage}
          >

          <span class="condition">
            ${this.product.condition}
          </span>

          <md-icon-button
            class=${this.favorite ? "favorite active" : "favorite"}
            aria-label=${
              this.favorite
                ? `Remove ${this.product.name} from favorites`
                : `Add ${this.product.name} to favorites`
            }
            @click=${this.toggleFavorite}
          >
            <md-icon>
              ${this.favorite ? "favorite" : "favorite_border"}
            </md-icon>
          </md-icon-button>
        </div>

        <div class="content">
          <p class="category">${this.product.category}</p>
          <h3>${this.product.name}</h3>

          <p class="description">
            ${this.product.description}
          </p>

          <div class="bottom">
            <span class="price">
              $${this.product.price.toFixed(2)}
            </span>

            <md-filled-button @click=${this.addToCart}>
              <md-icon slot="icon">shopping_cart</md-icon>
              Add
            </md-filled-button>
          </div>
        </div>
      </article>
    `;
  }
}

if (!customElements.get("product-card")) {
  customElements.define("product-card", ProductCard);
}
