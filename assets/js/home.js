import { fetchProducts } from "./api/api.js";
import { getProductHTML } from "./markups/productMarkup.js";
import { clickCart, addProductToCart } from "./utils/cartUtils.js";
import { updateCartNumber, updateHeader } from "./utils/updateHeader.js";
import { registerUser, loginUser } from "./user.js";
const productsPerPage = 8;
let currentPage = 1;

async function mainHomeLogic() {
  // localStorage.clear();
  updateCartNumber();

  updateHeader();
  handleSearchButtonClick();
  try {
    const products = await fetchProducts();

    const onPageClick = (clickedPage) => {
      clearProductDisplay();
      currentPage = clickedPage;
      displayProducts(products, currentPage);
    };

    displayProducts(products, currentPage);
    document.addEventListener("click", clickCart);
    registerUser();
    loginUser();
  } catch (error) {
    console.error("Error in mainHomeLogic:", error);
  }
}
function handleSearchButtonClick() {
  const searchInput = document.querySelector(".nav-search-btn").value.trim();
  if (searchInput !== "") {
    window.location.href = `category.html?search=${searchInput}`;
  } else {
    console.log("Vui lòng nhập từ khóa tìm kiếm.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", handleSearchButtonClick);
});
function displayProducts(products, page) {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);

  const productContainer = document.getElementById("productContainer");
  const productContainerHot = document.getElementById("productContainerHot");

  productContainer.innerHTML = "";
  productContainerHot.innerHTML = "";

  const productsSortedByView = [...products].sort((a, b) => b.view - a.view);
  const hotProductsToDisplay = productsSortedByView.slice(startIndex, endIndex);

  hotProductsToDisplay.forEach((product) => {
    const productHTML = getProductHTML(product, products);
    productContainerHot.insertAdjacentHTML("beforeend", productHTML);
  });

  productsToDisplay.forEach((product) => {
    const productHTML = getProductHTML(product);
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  });

  const handleClick = (event) => {
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
  };

  productContainer.addEventListener("click", handleClick);
  productContainerHot.addEventListener("click", handleClick);
}

function clearProductDisplay() {
  const productContainer = document.getElementById("productContainer");
  const productContainerHot = document.getElementById("productContainerHot");
  productContainer.innerHTML = "";
  productContainerHot.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", mainHomeLogic);
