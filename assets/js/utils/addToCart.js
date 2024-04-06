// addToCart.js
import { updateCartNumber } from "./updateHeader.js";

function addToCart(productToAdd, products) {
  const existingProductIndex = products.findIndex(
    (item) => item.id === productToAdd.id && item.size === productToAdd.size
  );

  if (existingProductIndex !== -1) {
    products[existingProductIndex].quantity += productToAdd.quantity;
  } else {
    products.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(products));
  updateCartNumber();
  return products;
}

export { addToCart };
