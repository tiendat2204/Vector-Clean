// cart.ts
import {
    getCartFromLocalStorage,
    updateCartItemInLocalStorage,
  } from "./utils/cartUtils";
  import { getCartItemHTML } from "./markups/cartMarkups";
  import { fetchProducts } from "./api/api";
  import { formatPrice } from "./utils/formatPrice";
  import { updateCartNumber, updateHeader } from "./utils/updateHeader";
  
  async function mainCartLogic(): Promise<void> {
    // localStorage.clear();
    updateHeader();
    updateCartTotalInDOM();
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
  
  function removeFromCart(productId: string): void {
    const cartItems = getCartFromLocalStorage();
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartNumber();
  }
  
  function renderCartItems(cartItems: any[], allProducts: any[]): void {
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
  
  function updateTotalPrice(index: number, productPrice: number, quantity: number): void {
    let totalPriceElement = document.querySelector(`.total-price[data-index="${index}"]`);
    const totalPrice = productPrice * quantity;
    if (totalPriceElement instanceof HTMLElement) {
      totalPriceElement.innerHTML = formatPrice(totalPrice);
    }
  }
  
  function updateCartTotalInDOM(): void {
    const cartTotalElement = document.getElementById("cartTotal");
  
    if (cartTotalElement) {
      const cart = getCartFromLocalStorage();
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const formattedTotal = formatPrice(totalAmount);
  
      const valueElement = cartTotalElement.querySelector<HTMLElement>(".value");
      if (valueElement) {
        valueElement.textContent = formattedTotal;
      }
    }
  }
  
  function attachQuantityEventListeners(
    cartItems: any[],
    allProducts: any[],
    updateTotal: boolean = true
  ): void {
    cartItems.forEach((item, index) => {
      const productPrice = allProducts.find((product) => product.id === item.id)?.price ?? 0;
      const minusBtn = document.querySelector<HTMLButtonElement>(`.minus-btn[data-index="${index}"]`);
      const plusBtn = document.querySelector<HTMLButtonElement>(`.plus-btn[data-index="${index}"]`);
      const quantityInput = document.querySelector<HTMLInputElement>(`#quantityValue[data-index="${index}"]`);
      const sizeSelect = document.querySelector<HTMLSelectElement>(`.size-option[data-index="${index}"]`);
      const deleteBtn = document.querySelector<HTMLButtonElement>(`.delete-btn[data-index="${index}"]`);
  
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
            if (quantityInput) quantityInput.value = item.quantity.toString();
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
          if (quantityInput) quantityInput.value = item.quantity.toString();
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
  