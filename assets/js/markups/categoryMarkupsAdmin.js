import {
  fillEditFormCategory,
  closeEditCategoryModal,
  SuccessMessage,
} from "../utils/utilsAdmin.js";
import {
  fetchCategories,
  fetchProducts,
  getCategoryDetails,
  updateCategory,
  deleteCategory,
} from "../api/api.js";
import { getDataAdminEditCategory } from "../utils/getDataUtils.js";

async function displayCategories() {
  const categoryContainer = document.getElementById("categoryContainerAdminVip");
  try {
    const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
    const categoryQuantityMap = products.reduce((map, product) => {
      map[product.categoryId] = (map[product.categoryId] || 0) + 1;
      return map;
    }, {});
    const categoryMarkup = categories.map(category => createCategoryMarkup(category, categoryQuantityMap[category.id] || 0)).join('');
    categoryContainer.innerHTML = categoryMarkup;
  } catch (error) {
    console.error("Lỗi khi hiển thị danh mục:", error);
  }
}

function attachButtonEvents() {
  document.addEventListener("click", async (event) => {
    const categoryId = event.target.dataset.idCategory;

    if (event.target.classList.contains("change-btn-category")) {
      try {
        await editCategory(categoryId);
      } catch (error) {
        console.error(error);
      }
    } else if (event.target.classList.contains("delete-btn-category")) {
      try {
        await deleteCategoryId(categoryId);
      } catch (error) {
        console.error(error);
      }
    }
  });
}

async function editCategory(categoryId) {
  const categoryToEdit = await getCategoryDetails(categoryId);
  fillEditFormCategory(categoryToEdit);

  const submitButton = document.querySelector("#editFormCategory .save-btn-category");
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const editedCategoryData = getDataAdminEditCategory();
    await updateCategory(categoryId, editedCategoryData);

    displayCategories();
    closeEditCategoryModal();
    SuccessMessage("Chỉnh sửa danh mục thành công!");
  });
}

async function deleteCategoryId(categoryId) {
  await deleteCategory(categoryId);
  displayCategories();
  SuccessMessage("Xóa danh mục thành công!");
}

function createCategoryMarkup(category, quantity) {
  return `
    <div class="category-row">
      <button class="cell-more-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
      <div class="product-cell name">
        <span>${category.name}</span>
      </div>
      <div class="product-cell quantity">
        <span class="cell-label">Số lượng:</span>${quantity} sản phẩm
      </div>
      <div class="product-cell status-cell">
        <span class="cell-label">Trạng thái:</span>
        <span class="status ${category.status === "Active" ? "active" : "disabled"}">${category.status}</span>
      </div>
      <div class="product-cell function">
        <button class="change-btn-category" data-id-category="${category.id}" data-form="category">Chỉnh sửa</button>
        <button class="delete-btn-category" data-id-category="${category.id}" data-form="category">Xóa</button>
      </div>
    </div>`;
}

attachButtonEvents();

export { displayCategories };
