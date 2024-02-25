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
          <svg class="IconContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <!--!Font Awesome path here -->
          </svg>
          <p class="text">Add to Cart</p>
        </button>
      </div>
    </div>
  `;
}

export { displayProductDetail };
