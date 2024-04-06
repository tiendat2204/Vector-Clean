import {
  fetchProductsByCategory,
  fetchCategories,
  fetchProducts,
} from "./api/api.js";
import { displayCategories } from "./markups/categoryMarkup.js";
import { getProductHTML } from "./markups/productMarkup.js";
import { clickCart } from "./utils/cartUtils.js";
import { updateCartNumber, updateHeader } from "./utils/updateHeader.js";
import { SuccessMessage } from "./utils/utilsAdmin.js";
import { registerUser, loginUser } from "./user.js";

let currentPage = 1;
let currentCategoryId = null;
let onPageClick;

async function mainCategoryLogic() {
  try {
    const categories = await fetchCategories();
    displayCategories(categories);
    updateCartNumber();
    updateHeader();
    registerUser();
    loginUser();
    handleSearchButtonClick();
    onPageClick = (clickedPage) => {
      currentPage = clickedPage;
      displayProductsByCategory(currentCategoryId, currentPage);
    };

    const onCategoryClick = async (categoryId) => {
      currentCategoryId = categoryId;
      currentPage = 1;
      await displayProductsByCategory(categoryId, currentPage);
    };

    document.querySelectorAll(".shoe-category").forEach((categorySpan) => {
      categorySpan.addEventListener("click", () => {
        const categoryId = categorySpan.dataset.categoryId;
        onCategoryClick(categoryId);
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
      await handleSearch(searchQuery);
    } else {
      const categoryIdFromUrl = urlParams.get("category");
      const pageFromUrl = parseInt(urlParams.get("page")) || 1;
      if (categoryIdFromUrl) {
        currentCategoryId = categoryIdFromUrl;
        currentPage = pageFromUrl;
        await displayProductsByCategory(currentCategoryId, currentPage);
      } else if (categories.length > 0) {
        const categoryId = categories[0].id;
        onCategoryClick(categoryId);
      }
    }

    const priceFilter = document.getElementById("price-filter");
    priceFilter.addEventListener("change", async () => {
      const selectedRange = priceFilter.value;
      await filterProductsByPrice(selectedRange);
    });
  } catch (error) {
    console.error("Error in mainCategoryLogic:", error);
  }
}

async function handleSearch(searchQuery) {
  clearProductDisplay();
  const products = await fetchProductsBySearch(searchQuery);
  renderProducts(products);

  const priceFilter = document.getElementById("price-filter");
  priceFilter.addEventListener("change", async () => {
    const selectedRange = priceFilter.value;
    await filterProductsByPrice(products, selectedRange);
  });
}

async function fetchProductsBySearch(searchQuery) {
  try {
    const products = await fetchProducts();
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return filteredProducts;
  } catch (error) {
    console.error("Error in fetchProductsBySearch:", error);
    return [];
  }
}

async function displayProductsByCategory(categoryId, page) {
  try {
    const products = await fetchProductsByCategory(categoryId);
    if (products) {
      clearProductDisplay();
      renderProducts(products);
    }
  } catch (error) {
    console.error("Error in displayProductsByCategory:", error);
  }
}

async function filterProductsByPrice(range) {
  try {
    let products = [];
    if (range === "all") {
      products = await fetchProductsByCategory(currentCategoryId);
    } else {
      const [minPrice, maxPrice] = getPriceRange(range);
      const allProducts = await fetchProductsByCategory(currentCategoryId);
      products = allProducts.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice;
      });
    }

    if (products) {
      clearProductDisplay();
      renderProducts(products);
    }
  } catch (error) {
    console.error("Error in filterProductsByPrice:", error);
  }
}

function renderProducts(products) {
  const productContainer = document.getElementById("productContainer");
  products.forEach((product) => {
    const productHTML = getProductHTML(product);
    if (productHTML) {
      const parser = new DOMParser();
      const productDocument = parser.parseFromString(productHTML, "text/html");
      const productElement = productDocument.body.firstChild;
      productContainer.appendChild(productElement);

      const addToCartButton = productElement.querySelector(".CartBtn");
      addToCartButton.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const itemToAdd = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: 35,
            image: product.image,
          };
          clickCart(itemToAdd);
        } else {
          SuccessMessage("Please log in!");
        }
      });
    }
  });
}

function clearProductDisplay() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
}

function handleSearchButtonClick() {
  const searchInput = document.querySelector(".nav-search-btn").value.trim();
  if (searchInput !== "") {
    window.location.href = `category.html?search=${searchInput}`;
  } else {
    console.log("Please enter a search keyword.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", handleSearchButtonClick);
});

function getPriceRange(range) {
  switch (range) {
    case "1-2":
      return [1500000, 2000000];
    case "3-4":
      return [2000000, 2500000];
    case "5-7":
      return [2500000, 3000000];
    case "6-8":
      return [3000000, 3500000];
    default:
      return [0, Infinity];
  }
}

document.addEventListener("DOMContentLoaded", mainCategoryLogic);
