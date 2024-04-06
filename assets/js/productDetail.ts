// productDetail.ts

import { getProductDetails } from './api/api';
import { displayProductDetail } from './markups/productDetailMarkups';
import { updateCartNumber, updateHeader } from './utils/updateHeader';
import { clickCart, showNotification } from './utils/cartUtils';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

async function mainProductDetailLogic(): Promise<void> {
  updateCartNumber();
  updateHeader();

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  if (typeof productId !== 'string') {
    console.error('Invalid productId:', productId);
    return;
  }
  const product: Product | null = await getProductDetails(productId);

  if (!product) {
    console.error('Product not found!');
    return;
  }

  displayProductDetail(product,0);

  const addToCartBtn = document.getElementById('btn-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', async () => {
      const selectedSize = (document.getElementById('sizeSelect') as HTMLSelectElement).value;
      const selectedQuantity = (document.getElementById('quantityValue') as HTMLInputElement).value;

      const itemToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: parseInt(selectedQuantity),
        size: parseInt(selectedSize),
        image: product.image,
      };
      console.log(itemToAdd.id);
      clickCart(itemToAdd);
      updateCartNumber();
      showNotification();
    });
  }

  const minusBtns = document.querySelectorAll<HTMLButtonElement>('.quantity .minus-btn');
  const plusBtns = document.querySelectorAll<HTMLButtonElement>('.quantity .plus-btn');
  
  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener('click', () => {
      const index = minusBtn.dataset.index; // Lấy giá trị từ dataset
      if (index !== undefined) { // Kiểm tra nếu index không phải undefined
        updateQuantity(index.toString(), -1); // Chuyển đổi index thành chuỗi và gọi hàm updateQuantity
      }
    });
  });
  
  plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener('click', () => {
      const index = plusBtn.dataset.index; // Lấy giá trị từ dataset
      if (index !== undefined) { // Kiểm tra nếu index không phải undefined
        updateQuantity(index.toString(), 1); // Chuyển đổi index thành chuỗi và gọi hàm updateQuantity
      }
    });
  });
  
  
  
  function updateQuantity(index: string | null, change: number): void {
    if (!index) return;

    const quantityInput = document.querySelector<HTMLInputElement>(`#quantityValue[data-index="${index}"]`);
    if (!quantityInput) return;

    let currentQuantity = parseInt(quantityInput.value) || 0;
    currentQuantity += change;

    if (currentQuantity < 1) {
      currentQuantity = 1;
    }

    quantityInput.value = currentQuantity.toString();
  }
}

document.addEventListener('DOMContentLoaded', mainProductDetailLogic);
