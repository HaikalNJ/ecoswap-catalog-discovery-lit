import { LitElement, html, css } from "lit";

import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/icon/icon.js";

import { products } from "../data/products.js";
import "./product-card.js";

class ProductDetail extends LitElement {
  static properties = {
    product: { attribute: false },
    favorite: { type: Boolean },
    favoriteIds: { attribute: false },
    selectedImage: { state: true }
  };

  constructor() {
    super();
    this.product = null;
    this.favorite = false;
    this.favoriteIds = new Set();
    this.selectedImage = "";
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("product") && this.product) {
      this.selectedImage = this.product.gallery?.[0] || this.product.image;
    }
  }

  goBack() {
    this.dispatchEvent(
      new CustomEvent("catalog:back-to-listings", {
        bubbles: true,
        composed: true
      })
    );
  }

  addToCart() {
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

  toggleFavorite() {
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

  contactSeller() {
    this.dispatchEvent(
      new CustomEvent("catalog:contact-seller", {
        detail: {
          productId: this.product.id,
          seller: this.product.seller
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
      font-family: Roboto, Arial, sans-serif;
      color: #20231f;
      --md-sys-color-primary: #137c35;
      --md-sys-color-on-primary: #ffffff;
    }

    * {
      box-sizing: border-box;
    }

    .detail-page {
      max-width: 1450px;
      margin: 0 auto;
      padding: 30px 28px 90px;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 7px;
      margin: 0 0 22px;
      color: #657062;
      font-size: 14px;
    }

    .breadcrumb-button {
      padding: 0;
      border: none;
      background: transparent;
      color: #4f5b4d;
      cursor: pointer;
    }

    .breadcrumb-button:hover {
      color: #137c35;
      text-decoration: underline;
    }

    .breadcrumbs md-icon {
      font-size: 17px;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(380px, 0.85fr);
      gap: 46px;
      align-items: start;
    }

    .main-image-wrapper {
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: 20px;
      background: #eff2ed;
    }

    .main-image {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .thumbnails {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
      margin-top: 15px;
    }

    .thumbnail {
      aspect-ratio: 4 / 3;
      overflow: hidden;
      padding: 0;
      border: 2px solid transparent;
      border-radius: 12px;
      background: #eff2ed;
      cursor: pointer;
    }

    .thumbnail.active {
      border-color: #137c35;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .product-info {
      padding-top: 2px;
    }

    .labels {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 9px;
      margin-bottom: 17px;
    }

    .condition,
    .authenticated {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 7px 12px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
    }

    .condition {
      background: #69cc73;
      color: #0e5620;
      text-transform: uppercase;
    }

    .authenticated {
      background: #edf0eb;
      color: #576254;
    }

    .authenticated md-icon {
      font-size: 17px;
    }

    h1 {
      margin: 0 0 10px;
      font-size: clamp(32px, 4vw, 43px);
      line-height: 1.15;
    }

    .price-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 28px;
    }

    .price {
      color: #087b2a;
      font-size: clamp(40px, 5vw, 54px);
      font-weight: 700;
    }

    .old-price {
      color: #697267;
      font-size: 16px;
      text-decoration: line-through;
    }

    .description-title {
      margin: 0 0 11px;
      font-size: 21px;
    }

    .description {
      margin: 0 0 22px;
      color: #566053;
      font-size: 16px;
      line-height: 1.7;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 11px;
      margin: 0 0 28px;
      padding: 0;
      list-style: none;
    }

    .features li {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      color: #4f594d;
      font-size: 14px;
      line-height: 1.4;
    }

    .features md-icon {
      flex: 0 0 auto;
      color: #137c35;
      font-size: 19px;
    }

    .primary-actions {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      margin-bottom: 26px;
    }

    .add-button {
      width: 100%;
      --md-filled-button-container-height: 55px;
      --md-filled-button-container-shape: 999px;
    }

    .save-button {
      --md-icon-button-container-width: 55px;
      --md-icon-button-container-height: 55px;
      --md-icon-button-icon-color: #657062;
      border: 1px solid #b9c7b5;
      border-radius: 999px;
    }

    .save-button.active {
      --md-icon-button-icon-color: #c62828;
    }

    .seller-card {
      padding: 23px;
      border: 1px solid #cbd8c8;
      border-radius: 18px;
      background: #f5f7f3;
    }

    .seller-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      margin-bottom: 17px;
    }

    .seller-heading h2 {
      margin: 0;
      font-size: 21px;
    }

    .rating {
      color: #3e493c;
      font-size: 13px;
      white-space: nowrap;
    }

    .rating strong {
      color: #087b2a;
    }

    .seller {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 14px;
      margin-bottom: 17px;
    }

    .seller-avatar {
      width: 50px;
      height: 50px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #9beca3;
      color: #137c35;
      font-size: 24px;
    }

    .seller-details p {
      margin: 3px 0;
      color: #5b6658;
      font-size: 13px;
    }

    .seller-details md-icon {
      margin-right: 3px;
      font-size: 15px;
      vertical-align: -3px;
    }

    .contact-button {
      width: 100%;
      --md-outlined-button-container-shape: 999px;
    }

    .assurances {
      display: flex;
      flex-direction: column;
      gap: 13px;
      margin-top: 25px;
      padding-top: 22px;
      border-top: 1px solid #d9e0d6;
      color: #586356;
      font-size: 14px;
    }

    .assurance {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .assurance md-icon {
      color: #137c35;
      font-size: 21px;
    }

    .recommendations {
      margin-top: 75px;
      padding-top: 52px;
      border-top: 1px solid #dfe5dc;
    }

    .recommendations h2 {
      margin: 0 0 27px;
      font-size: 29px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 22px;
    }

    @media (max-width: 1000px) {
      .detail-grid {
        grid-template-columns: 1fr;
      }

      .product-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 620px) {
      .detail-page {
        padding: 24px 16px 60px;
      }

      .detail-grid {
        gap: 28px;
      }

      .thumbnails {
        gap: 8px;
      }

      .seller-heading {
        align-items: flex-start;
        flex-direction: column;
      }

      .recommendations {
        margin-top: 55px;
      }

      .product-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    if (!this.product) {
      return html``;
    }

    const gallery = this.product.gallery?.length
      ? this.product.gallery
      : [this.product.image];

    const recommendedProducts = products
      .filter((product) => product.id !== this.product.id)
      .sort((first, second) => {
        const firstMatches = first.category === this.product.category ? 1 : 0;
        const secondMatches = second.category === this.product.category ? 1 : 0;
        return secondMatches - firstMatches;
      })
      .slice(0, 4);

    return html`
      <section class="detail-page" aria-labelledby="product-title">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <button class="breadcrumb-button" @click=${this.goBack}>
            Home
          </button>
          <md-icon>chevron_right</md-icon>
          <button class="breadcrumb-button" @click=${this.goBack}>
            ${this.product.category}
          </button>
          <md-icon>chevron_right</md-icon>
          <strong>${this.product.name}</strong>
        </nav>

        <div class="detail-grid">
          <div class="gallery">
            <div class="main-image-wrapper">
              <img
                class="main-image"
                src=${this.selectedImage || this.product.image}
                alt=${this.product.name}
                @error=${this.hideBrokenImage}
              >
            </div>

            <div class="thumbnails" aria-label="Product images">
              ${gallery.map(
                (image, index) => html`
                  <button
                    class=${
                      image === (this.selectedImage || this.product.image)
                        ? "thumbnail active"
                        : "thumbnail"
                    }
                    aria-label="Show image ${index + 1}"
                    @click=${() => {
                      this.selectedImage = image;
                    }}
                  >
                    <img
                      src=${image}
                      alt="${this.product.name} view ${index + 1}"
                      @error=${this.hideBrokenImage}
                    >
                  </button>
                `
              )}
            </div>
          </div>

          <div class="product-info">
            <div class="labels">
              <span class="condition">${this.product.condition}</span>
              <span class="authenticated">
                <md-icon>verified</md-icon>
                Authenticated
              </span>
            </div>

            <h1 id="product-title">${this.product.name}</h1>

            <div class="price-row">
              <span class="price">$${this.product.price.toFixed(2)}</span>
              ${this.product.oldPrice
                ? html`
                    <span class="old-price">
                      $${this.product.oldPrice.toFixed(2)}
                    </span>
                  `
                : ""}
            </div>

            <h2 class="description-title">Description</h2>
            <p class="description">${this.product.description}</p>

            <ul class="features">
              ${this.product.features.map(
                (feature) => html`
                  <li>
                    <md-icon>check_circle</md-icon>
                    <span>${feature}</span>
                  </li>
                `
              )}
            </ul>

            <div class="primary-actions">
              <md-filled-button
                class="add-button"
                @click=${this.addToCart}
              >
                <md-icon slot="icon">shopping_bag</md-icon>
                Add to Cart
              </md-filled-button>

              <md-icon-button
                class=${this.favorite ? "save-button active" : "save-button"}
                aria-label=${
                  this.favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                @click=${this.toggleFavorite}
              >
                <md-icon>
                  ${this.favorite ? "favorite" : "favorite_border"}
                </md-icon>
              </md-icon-button>
            </div>

            <div class="seller-card">
              <div class="seller-heading">
                <h2>Sold by ${this.product.seller}</h2>
                <span class="rating">
                  <strong>★ ${this.product.rating}</strong>
                  (${this.product.reviews} reviews)
                </span>
              </div>

              <div class="seller">
                <div class="seller-avatar">
                  ${this.product.seller.charAt(0)}
                </div>

                <div class="seller-details">
                  <strong>${this.product.seller}</strong>
                  <p>Member since 2021</p>
                  <p>
                    <md-icon>location_on</md-icon>
                    ${this.product.location}
                  </p>
                </div>
              </div>

              <md-outlined-button
                class="contact-button"
                @click=${this.contactSeller}
              >
                Contact Seller
              </md-outlined-button>
            </div>

            <div class="assurances">
              <div class="assurance">
                <md-icon>local_shipping</md-icon>
                Free carbon-neutral shipping
              </div>
              <div class="assurance">
                <md-icon>verified_user</md-icon>
                EcoSwap Buyer Protection
              </div>
            </div>
          </div>
        </div>

        <section class="recommendations" aria-labelledby="recommendations-title">
          <h2 id="recommendations-title">You might also like</h2>

          <div class="product-grid">
            ${recommendedProducts.map(
              (product) => html`
                <product-card
                  .product=${product}
                  .favorite=${this.favoriteIds.has(product.id)}
                ></product-card>
              `
            )}
          </div>
        </section>
      </section>
    `;
  }
}

if (!customElements.get("product-detail")) {
  customElements.define("product-detail", ProductDetail);
}
