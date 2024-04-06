import { formatPrice } from "../utils/formatPrice.js";

function displayCartItemsCheckout(): void {
  const orderList = document.querySelector<HTMLElement>(".order-list");
  const cartTotal = document.getElementById("cartTotal");

  const cartItems: any[] = JSON.parse(localStorage.getItem("cart") ?? "[]") || [];

  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("order-item");
    listItem.innerHTML = `
            <img src='./assets/img/${item.image}' alt='${item.name}'>
            <div class='item-details'>
                <div class="product-price-out">
                    <a href="javascript:void(0);" class="product-name-item">${item.name}</a>
                </div>
                <div class="product-price-out">
                    <span class="product-price-item-out">${formatPrice(item.price)}</span>
                </div>
                <div class="product-size">
                    <span class="product-size-item-out">Size: ${item.size}</span>
                </div>
                <div class="product-quantity-out">
                    <span class="product-quantity-item">Số Lượng: ${item.quantity}</span>
                </div>
            </div>
        `;
    orderList?.appendChild(listItem);
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPriceElement = cartTotal?.querySelector(".value");
  if (totalPriceElement) {
    totalPriceElement.textContent = `${formatPrice(totalPrice)}`;
  }
}

export { displayCartItemsCheckout };
