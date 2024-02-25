import { fetchCategories, fetchProductsByCategory } from './api/api.js';
import { displayCategories } from './markups/categoryMarkup.js';
import { getProductHTML } from './markups/productMarkup.js';
import { displayPagination } from './markups/paginationMarkup.js';
import { clickCart } from './utils/cartUtils.js';
import { updateCartNumber,updateHeader } from './utils/updateHeader.js';
import { SuccessMessage } from './utils/utilsAdmin.js';
const productsPerPage = 4;
let currentPage = 1;
let currentCategoryId = null;
let onPageClick; 

async function mainCategoryLogic() {
  try {
    const categories = await fetchCategories();
    displayCategories(categories);
updateCartNumber();
updateHeader();

    onPageClick = (clickedPage) => {
      currentPage = clickedPage;
      displayProductsByCategory(currentCategoryId, currentPage);
    };

    const onCategoryClick = async (categoryId) => {
      currentCategoryId = categoryId;
      currentPage = 1;
      await displayProductsByCategory(categoryId, currentPage);
    };

    document.querySelectorAll('.shoe-category').forEach((categorySpan) => {
      categorySpan.addEventListener('click', () => {
        const categoryId = categorySpan.dataset.categoryId;
        onCategoryClick(categoryId);
      });
    });

    if (categories.length > 0) {
      const categoryId = categories[0].id;
      onCategoryClick(categoryId);
    }
  } catch (error) {
    console.error('Lỗi trong mainCategoryLogic:', error);
  }
}

async function displayProductsByCategory(categoryId, page) {
  try {
    const products = await fetchProductsByCategory(categoryId);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = page * productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    clearProductDisplay();

    const productContainer = document.getElementById('productContainer');
    productsToDisplay.forEach(product => {
      const productHTML = getProductHTML(product);
      if (productHTML) {
        const parser = new DOMParser();
        const productDocument = parser.parseFromString(productHTML, 'text/html');
        const productElement = productDocument.body.firstChild;
        productContainer.appendChild(productElement);

        const addToCartButton = productElement.querySelector('.CartBtn');
        addToCartButton.addEventListener('click', () => {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            const itemToAdd = {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              size: 35,
              image: product.image
            };
            clickCart(itemToAdd);
          } else {
            SuccessMessage('Vui lòng đăng nhập !')
          }
        });
      }
    });

    displayPagination(products.length, currentPage, productsPerPage, onPageClick);
  } catch (error) {
    console.error('Lỗi trong displayProductsByCategory:', error);
  }
}


function clearProductDisplay() {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', mainCategoryLogic);
