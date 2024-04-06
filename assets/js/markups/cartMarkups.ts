// cartMarkups.ts
import { formatPrice } from "../utils/formatPrice";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

function getCartItemHTML(item: CartItem, allProducts: CartItem[], index: number): string {
  if (allProducts && allProducts.length > 0) {
    const product = allProducts.find((p) => p.id === item.id);
    if (product) {
      const totalPrice = item.quantity * product.price;
      const formatTotalPrice = formatPrice(totalPrice);

      return `
        <div class="item" data-product-id="${item.id}">
          <div class="in4">
            <img src="./assets/img/${item.image}" alt="" class="img-prd" />
            <div class="name">
              <span class="prd-name">${item.name}</span>
              <span class="price-prd">${formatPrice(item.price)}</span>
              <select class="size-option" name="size" data-index="${index}">
                <option value="35" ${item.size === "35" ? "selected" : ""}>Size 35</option>
                <option value="36" ${item.size === "36" ? "selected" : ""}>Size 36</option>
                <option value="37" ${item.size === "37" ? "selected" : ""}>Size 37</option>
                <option value="38" ${item.size === "38" ? "selected" : ""}>Size 38</option>
                <option value="39" ${item.size === "39" ? "selected" : ""}>Size 39</option>
                <option value="40" ${item.size === "40" ? "selected" : ""}>Size 40</option>
                <option value="41" ${item.size === "41" ? "selected" : ""}>Size 41</option>
                <option value="42" ${item.size === "42" ? "selected" : ""}>Size 42</option>
                <option value="43" ${item.size === "43" ? "selected" : ""}>Size 43</option>
              </select>
            </div>
          </div>
          <div class="quantity" data-index="${index}">
            <button class="minus-btn" type="button" data-index="${index}">
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="text" name="quantity" id="quantityValue" value="${item.quantity}" data-index="${index}" />
            <button class="plus-btn" type="button" data-index="${index}">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="total-price" data-index="${index}" >${formatTotalPrice}</div>
          <div class="buttons">
            <span class="delete-btn" data-index="${index}">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
              </svg>
            </span>
          </div>
        </div>
      `;
    } else {
      console.error("Product not found with ID:", item.id);
    }
  }

  return `
    <div class="empty-cart-message">
      <p>Giỏ hàng trống</p>
    </div>
  `;
}

export { getCartItemHTML };
