// productDetail.js

import { getProductDetails, fetchProducts } from './api/api.js';
import { displayProductDetail } from './markups/productDetailMarkups.js';
import { updateCartNumber,updateHeader } from './utils/updateHeader.js';
import { clickCart, showNotification } from './utils/cartUtils.js';

async function mainProductDetailLogic() {
  updateCartNumber();
  updateHeader();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  const product = await getProductDetails(productId);

  displayProductDetail(product);
  const addToCartBtn = document.getElementById('btn-add-to-cart');
addToCartBtn.addEventListener('click', async () => {
  const selectedSize = document.getElementById('sizeSelect').value;
  const selectedQuantity = document.getElementById('quantityValue').value;

  const itemToAdd = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: parseInt(selectedQuantity),
    size: selectedSize,
    image: product.image,
  };
  console.log(itemToAdd.id);
  clickCart(itemToAdd);
  updateCartNumber();
  showNotification();
});


  const minusBtns = document.querySelectorAll('.quantity .minus-btn');
  const plusBtns = document.querySelectorAll('.quantity .plus-btn');

  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener('click', () => {
      updateQuantity(minusBtn.dataset.index, -1);
    });
  });

  plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener('click', () => {
      updateQuantity(plusBtn.dataset.index, 1);
    });
  });

  function updateQuantity(index, change) {
    const quantityInput = document.querySelector(`#quantityValue[data-index="${index}"]`);
    let currentQuantity = parseInt(quantityInput.value) || 0;
    currentQuantity += change;

    if (currentQuantity < 1) {
      currentQuantity = 1;
    }

    quantityInput.value = currentQuantity;
  }
}

document.addEventListener('DOMContentLoaded', mainProductDetailLogic);
