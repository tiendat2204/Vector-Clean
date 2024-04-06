import { fetchCategories, fetchProductsByCategory } from './api/api';
import { displayCategories } from './markups/categoryMarkup';
import { getProductHTML, redirectToProductDetail } from './markups/productMarkup';
import { displayPagination } from './markups/paginationMarkup';
import { clickCart } from './utils/cartUtils';
import { updateCartNumber, updateHeader } from './utils/updateHeader';
import { SuccessMessage } from './utils/utilsAdmin';

const productsPerPage: number = 4;
let currentPage: number = 1;
let currentCategoryId: string | null = null;
let onPageClick: ((clickedPage: number) => void) | undefined;

async function mainCategoryLogic(): Promise<void> {
  try {
    const categories = await fetchCategories();
    displayCategories(categories);
    updateCartNumber();
    updateHeader();

    onPageClick = (clickedPage: number) => {
        currentPage = clickedPage;
        if (currentCategoryId !== null) {
          displayProductsByCategory(currentCategoryId, currentPage);
        }
      };
    const onCategoryClick = async (categoryId: string) => {
      currentCategoryId = categoryId;
      currentPage = 1;
      await displayProductsByCategory(categoryId, currentPage);
    };

    document.querySelectorAll<HTMLSpanElement>('.shoe-category').forEach((categorySpan) => {
        categorySpan.addEventListener('click', () => {
          const categoryId = categorySpan.dataset.categoryId;
          if (categoryId !== undefined && categoryId !== null) {
            currentCategoryId = categoryId;
            onCategoryClick(categoryId);
          }
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

async function displayProductsByCategory(categoryId: string, page: number): Promise<void> {
  try {
    const products = await fetchProductsByCategory(categoryId);
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = page * productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    clearProductDisplay();

    const productContainer = document.getElementById('productContainer');
    if (productContainer) {
      productsToDisplay.forEach((product: any) => {
        const productHTML = getProductHTML(product);
        if (productHTML) {
          const parser = new DOMParser();
          const productDocument = parser.parseFromString(productHTML, 'text/html');
          const productElement = productDocument.body.firstChild;
          if (productElement) {
            productContainer.appendChild(productElement);

            // Thêm sự kiện click vào phần tử sản phẩm
            productElement.addEventListener('click', () => {
              redirectToProductDetail(product.id);
            });

            const addToCartButton = (productElement as HTMLElement).querySelector('.CartBtn');

            if (addToCartButton) {
              addToCartButton.addEventListener('click', () => {
                const user = JSON.parse(localStorage.getItem('user') || '');
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
                  SuccessMessage('Vui lòng đăng nhập !');
                }
              });
            }
          }
        }
      });

      if (onPageClick) {
        displayPagination(products.length, currentPage, productsPerPage, onPageClick);
      } else {
        console.error('onPageClick is undefined');
      }
      
    }
  } catch (error) {
    console.error('Lỗi trong displayProductsByCategory:', error);
  }
}

function clearProductDisplay(): void {
  const productContainer = document.getElementById('productContainer');
  if (productContainer) {
    productContainer.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', mainCategoryLogic);
