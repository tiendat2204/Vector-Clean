// cart.js
import {
  getCartFromLocalStorage,
  updateCartItemInLocalStorage,
} from "./utils/cartUtils.js";
import { getCartItemHTML } from "./markups/cartMarkups.js";
import { fetchProducts } from "./api/api.js";
import { formatPrice } from "./utils/formatPrice.js";
import { updateCartNumber,updateHeader } from "./utils/updateHeader.js";
import { registerUser, loginUser } from "./user.js";

async function mainCartLogic() {
  // localStorage.clear();
  updateHeader();
  updateCartTotalInDOM();
  loginUser();
  registerUser();
  try {
    const allProducts = await fetchProducts();
    const cartItems = getCartFromLocalStorage();
    renderCartItems(cartItems, allProducts);
    attachQuantityEventListeners(cartItems, allProducts);
    updateCartNumber();

  } catch (error) {
    console.error("Error in mainCartLogic:", error);
  }
}
function removeFromCart(productId) {
  const cartItems = getCartFromLocalStorage();
  const updatedCart = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  updateCartNumber();
  return updatedCart;
}

function renderCartItems(cartItems, allProducts) {
  const cartContainer = document.getElementById("cartContainer");
  if (cartContainer) {
    cartContainer.innerHTML = "";

    cartItems.forEach((item, index) => {
      const cartItemHTML = getCartItemHTML(item, allProducts, index);
      if (cartItemHTML) {
        cartContainer.innerHTML += cartItemHTML;
      }
    });
  }
}
function updateTotalPrice(index, productPrice, quantity) {
  let totalPriceElement = document.querySelector(
    `.total-price[data-index="${index}"]`
  );
  const totalPrice = productPrice * quantity;
  totalPriceElement.innerHTML = formatPrice(totalPrice);
}
function updateCartTotalInDOM() {
  const cartTotalElement = document.getElementById("cartTotal");

  if (cartTotalElement) {
    const cart = getCartFromLocalStorage();
    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const formattedTotal = formatPrice(totalAmount);

    const valueElement = cartTotalElement.querySelector(".value");
    if (valueElement) {
      valueElement.textContent = formattedTotal;
    }
  }
}
function attachQuantityEventListeners(
  cartItems,
  allProducts,
  updateTotal = true
) {
  cartItems.forEach((item, index) => {
    const productPrice = allProducts.find(
      (product) => product.id === item.id
    ).price;
    const minusBtn = document.querySelector(
      `.minus-btn[data-index="${index}"]`
    );
    
    const plusBtn = document.querySelector(`.plus-btn[data-index="${index}"]`);
    const quantityInput = document.querySelector(
      `#quantityValue[data-index="${index}"]`
    );
    const sizeSelect = document.querySelector(
      `.size-option[data-index="${index}"]`
    );
    const deleteBtn = document.querySelector(
      `.delete-btn[data-index="${index}"]`
    );

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        removeFromCart(item.id);
        cartItems.splice(index, 1);
        renderCartItems(cartItems, allProducts);
        attachQuantityEventListeners(cartItems, allProducts);
        if (updateTotal) {
          updateCartTotalInDOM();
        }
      });
    }

    if (minusBtn) {
      minusBtn.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          quantityInput.value = item.quantity;
          updateCartItemInLocalStorage(item);
          updateTotalPrice(index, productPrice, item.quantity);
          if (updateTotal) {
            updateCartTotalInDOM();
          }
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener("click", () => {
        item.quantity++;
        quantityInput.value = item.quantity;
        updateCartItemInLocalStorage(item);
        updateTotalPrice(index, productPrice, item.quantity);
        if (updateTotal) {
          updateCartTotalInDOM();
        }
      });
    }

    if (sizeSelect) {
      sizeSelect.addEventListener("change", () => {
        item.size = sizeSelect.value;
        updateCartItemInLocalStorage(item);
        updateTotalPrice(index, productPrice, item.quantity);
      });
    }
  });
}


document.addEventListener("DOMContentLoaded", mainCartLogic);
export { attachQuantityEventListeners };
