// utils/cartUtils.js
import { addToCart } from "./addToCart.js";
import { updateCartNumber } from "./updateHeader.js";
import { SuccessMessage } from "./utilsAdmin.js";

function addProductToCart(itemToAdd) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const products = getCartFromLocalStorage();
    addToCart(itemToAdd, products);
    localStorage.setItem("cart", JSON.stringify(products));
    updateCartNumber();
    showNotification();
  } else {
    SuccessMessage("Vui lòng đăng nhập!");
  }
}
function clickCart(itemToAdd) {
  if (itemToAdd && itemToAdd.id) {
    const products = getCartFromLocalStorage();
    addToCart(itemToAdd, products);
    showNotification();
  } else {
    console.error("Product information is undefined.");
  }
}

function getCartFromLocalStorage() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}
function updateCartItemInLocalStorage(updatedItem) {
  let cart = getCartFromLocalStorage();
  const itemIndex = cart.findIndex((item) => item.id === updatedItem.id);
  if (itemIndex !== -1) {
    cart[itemIndex] = updatedItem;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
function showNotification() {
  const notificationContainer = document.createElement("div");
  notificationContainer.classList.add("card-noti", "fade-in");

  notificationContainer.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#63E6BE" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
    <p class="cookieHeading">Thêm vào giỏ hàng thành công.</p>
    <div class="buttonContainer">
      <button class="acceptButton">Xem giỏ hàng</button>
      <button class="declineButton">Tiếp tục mua hàng</button>
    </div>
  `;

  const viewCartButton = notificationContainer.querySelector(".acceptButton");
  const continueShoppingButton =
    notificationContainer.querySelector(".declineButton");

  viewCartButton.addEventListener("click", () => {
    window.location.href = "../../cart.html";
  });

  continueShoppingButton.addEventListener("click", () => {
    document.body.removeChild(notificationContainer);
  });

  document.body.appendChild(notificationContainer);
  setTimeout(() => {
    notificationContainer.classList.add("fade-in");
  }, 10);
}

export {
  clickCart,
  getCartFromLocalStorage,
  updateCartItemInLocalStorage,
  showNotification,
  addProductToCart,
};
