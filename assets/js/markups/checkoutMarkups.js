// checkoutMarkups.js
import { formatPrice } from "../utils/formatPrice.js";

function displayCartItemsCheckout() {
  const orderList = document.querySelector(".order-list");
  const cartTotal = document.getElementById("cartTotal");

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("order-item");
    listItem.innerHTML = `
            <img src='./assets/img/${item.image}' alt='${item.name}'>
            <div class='item-details'>
                <div class="product-price-out">
                    <a href="javascript:void(0);" class="product-name-item">${
                      item.name
                    }</a>
                </div>
                <div class="product-price-out">
                    <span class="product-price-item-out">${formatPrice(
                      item.price
                    )}</span>
                </div>
                <div class="product-size">
                    <span class="product-size-item-out">Size: ${
                      item.size
                    }</span>
                </div>
                <div class="product-quantity-out">
                    <span class="product-quantity-item">Số Lượng: ${
                      item.quantity
                    }</span>
                </div>
            </div>
        `;
    orderList.appendChild(listItem);
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  cartTotal.querySelector(".value").textContent = `${formatPrice(totalPrice)}`;
}
function displayUserPay() {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    document.getElementById("name").value = userData.username || "";
    document.getElementById("phone-number").value = userData.phoneNumber || "";
    document.getElementById("email-out").value = userData.email || "";
    document.getElementById("address").value = userData.address || "";
  } else {
    document.getElementById("name").value = "";
    document.getElementById("phone-number").value = "";
    document.getElementById("email-out").value = "";
    document.getElementById("address").value = "";
  }
}
export { displayCartItemsCheckout, displayUserPay };
