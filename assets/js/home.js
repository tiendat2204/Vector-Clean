import { fetchProducts } from "./api/api.js";
import { getProductHTML } from "./markups/productMarkup.js";
import { displayPagination } from "./markups/paginationMarkup.js";
import { clickCart, addProductToCart } from "./utils/cartUtils.js";
import { updateCartNumber, updateHeader } from "./utils/updateHeader.js";
import { registerUser, loginUser } from "./user.js";
const productsPerPage = 8;
let currentPage = 1;

async function mainHomeLogic() {
  updateCartNumber();
  updateHeader();

  try {
    const products = await fetchProducts();

    const onPageClick = (clickedPage) => {
      clearProductDisplay();
      currentPage = clickedPage;
      displayProducts(products, currentPage);
      displayPagination(
        products.length,
        currentPage,
        productsPerPage,
        onPageClick
      );
    };

    displayProducts(products, currentPage);
    document.addEventListener("click", clickCart);
    displayPagination(
      products.length,
      currentPage,
      productsPerPage,
      onPageClick
    );
    registerUser();
    loginUser();
  } catch (error) {
    console.error("Error in mainHomeLogic:", error);
  }
}

function displayProducts(products, page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);
  const productContainer = document.getElementById("productContainer");

  productContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productHTML = getProductHTML(product);
    productContainer.innerHTML += productHTML;
  });

  productContainer.addEventListener("click", (event) => {
    const btn = event.target.closest(".CartBtn");
    if (btn) {
      const productId = btn.dataset.productId;
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        const itemToAdd = {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          quantity: 1,
          size: 35,
          image: productToAdd.image,
        };
        addProductToCart(itemToAdd);
      } else {
        console.error("Product not found with ID:", productId);
      }
    }
  });
}

function clearProductDisplay() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", mainHomeLogic);
