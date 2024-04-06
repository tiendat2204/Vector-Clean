// productDetailMarkups.js
import { formatPrice } from '../utils/formatPrice.js';

function displayProductDetail(item, index) {
  const productId = item.id;

  const containerDetail = document.getElementById('containerDetail');
  containerDetail.innerHTML = `
    <div class="left-column">
      <img src="./assets/img/${item.image}" alt="" />
    </div>
    <div class="right-column">
      <div class="product-description-detail">
        <h1 class="nameProductDetail">${item.name}</h1>
        <p class="description">${item.description || 'KHÔNG CÓ THÔNG TIN'}</p>
      </div>
      <div class="product-configuration">
      <div class="quantity" data-index="${index}" style="margin-bottom: 10px">
          <h4>Số Lượng</h4>
          <button class="minus-btn" type="button" data-index="${index}">
          <i class="fa-solid fa-minus"></i>
        </button>
        <input type="text" name="quantity" id="quantityValue" value="1" data-index="${index}" />
        <button class="plus-btn" type="button" data-index="${index}">
        <i class="fa-solid fa-plus"></i>
      </button>
        </div>
        <div class="cable-config">
          <h4>Size giày</h4>
          <div class="cable-choose">
          <label for="sizeSelect">Chọn kích cỡ:</label>
          <select id="sizeSelect">
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
          </select>
        </div>
        
        </div>
      </div>
      <div class="product-price-detail">
        <span>${formatPrice(item.price)} </span>
        <button class="CartBtn" data-product-id="${productId}" id="btn-add-to-cart">
        <svg class="IconContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          <p class="text">Add to Cart</p>
        </button>
      </div>
    </div>
  `;
}

export { displayProductDetail };
