import { renderDashboard } from "../markups/dashboard.js";
import {
  displayCategoriesAddForm,
  displayCategoriesForEditForm,
} from "../markups/categoryMarkupsAdminForm.js";
import { displayCategories } from "../markups/categoryMarkupsAdmin.js";
import { displayProductsAdmin } from "../markups/productMarkupsAdmin.js";
import { displayUsers } from "../markups/userAdminMarkups.js";
import { displayOrdersAdmin } from "../markups/orderAdminMarkups.js";
import { addProduct } from "./addProduct.js";
import {
  closeAddCategoryModalHandler,
  closeModal,
  SuccessMessage,
  updateSidebar,
} from "../utils/utilsAdmin.js";
import { getDataAdmin } from "../utils/getDataUtils.js";
import { addCategory } from "../api/api.js";
function loadPage(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Error loading page from ${url}: ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((data) => {
      const contentContainer = document.getElementById("content");
      contentContainer.innerHTML = data;

      if (url.includes("product-content.html")) {
        displayCategoriesForEditForm();
        displayProductsAdmin();
        const addProductForm = document.getElementById("addProductForm");

        if (addProductForm) {
          displayCategoriesAddForm();
          const btnSave = addProductForm.querySelector(".btn-save");
          if (btnSave) {
            btnSave.addEventListener("click", function (e) {
              e.preventDefault();
              const productData = getDataAdmin();
              addProduct(productData)
                .then(() => {
                  closeModal();
                  SuccessMessage("Thêm sản phẩm thành công!");
                  displayProductsAdmin();
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          }
        }
      } else if (url.includes("home-content.html")) {
        renderDashboard();
      } else if (url.includes("orders-content.html")) {
        displayOrdersAdmin();
      } else if (url.includes("user-content.html")) {
        displayUsers();
      } else if (url.includes("category-content.html")) {
        displayCategories();
        const addCategoryForm = document.getElementById("addCategoryForm");
        if (addCategoryForm) {
          const btnAdd = addCategoryForm.querySelector(".btn-save-category");
          if (btnAdd) {
            btnAdd.addEventListener("click", (e) => {
              e.preventDefault();
              const name = document.getElementById("addCategoryName").value;
              const status = document.getElementById("addCategoryStatus").value;
              const dataCategory = {
                name,
                status,
              };
              addCategory(dataCategory).then(() => {
                displayCategories();
                closeAddCategoryModalHandler();
                SuccessMessage("Thêm danh mục thành công");
              });
            });
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadPage("home-content.html");
  updateSidebar();
  document.querySelectorAll(".sidebar-list-item a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".sidebar-list-item a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");

      const url = this.getAttribute("href");
      loadPage(url);
    });
  });
});
