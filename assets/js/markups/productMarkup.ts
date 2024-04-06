import { formatPrice } from "../utils/formatPrice";
import { getProductDetails, updateProduct } from "../api/api";

function redirectToProductDetail(productId: string): void {
  getProductDetails(productId)
    .then((product) => {
      if (product) {
        let updatedView = 1;

        if (product.hasOwnProperty("view")) {
          updatedView = product.view + 1; 
        }

        product.view = updatedView;

        updateProduct(productId, product)
          .then(() => {
            window.location.href = `productDetail.html?productId=${productId}`;
          })
          .catch((error) => {
            console.error("Error updating product view:", error);
            // Xử lý lỗi nếu cần
          });
      } else {
        console.error("Product not found with ID:", productId);
      }
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      // Xử lý lỗi nếu cần
    });
}

function getProductHTML(product: any): string {
  const formattedPriceVip = formatPrice(product.price);
  if (product.status === "Active") {
    return `
      <div class="col l-3 m-6 c-6" data-product-id="${product.id}">
        <div class="container-product-app">
          <div class="container-product-column">
            <a href="javascript:void(0);" class="product-item">
              <img class="product-item-img" src="./assets/img/${product.image}" alt="">
            </a>
          </div>
          <div class="product-description">
            <a href="javascript:void(0);" class="product-description-list">${product.name}</a>
          </div>
          <div class="product-evaluate">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <div class="product-price">
            <span class="product-price-item">${formattedPriceVip}</span>
            <button class="CartBtn" data-product-id="${product.id}" id="btn-add-to-cart">
            <svg class="IconContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
              <p class="text">Add to Cart</p>
            </button>
          </div>
          <div class="product-new-list">New</div>
        </div>
      </div>
    `;
  } else if (product.status === "Block") {
    return "";
  } else {
    // Xử lý tùy ý khi không xác định trạng thái sản phẩm
    return "";
  }
}

setTimeout(() => {
    const productItems = document.querySelectorAll(".product-item");
    productItems.forEach((productItem) => {
      productItem.addEventListener("click", function(this: HTMLElement, event) {
        event.preventDefault();
        const productId = this.closest(".col")?.getAttribute("data-product-id");
        if (productId) {
          console.log(productId);
          redirectToProductDetail(productId);
        } else {
          console.error("Product ID not found");
        }
      });
    });
  }, 1000);
  

export { getProductHTML, redirectToProductDetail };
