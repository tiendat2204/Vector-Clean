import { fetchCategories , getCategoryDetails } from "../api/api.js";

function displayCategoriesAddForm() {
  fetchCategories()
    .then((categories) => {
      const categoryContainer = document.querySelector(
        ".customSelect"
      );
      categoryContainer.innerHTML = ""; 

      categories.forEach((category) => {
        const categoryButton = `
        <option class="value-category" data-category-id="${category.id}">
          ${category.name}
        </option>
      `;
        categoryContainer.innerHTML += categoryButton;
      });

      categoryContainer
        .querySelectorAll(".value-category")
        .forEach((button) => {
          button.addEventListener("click", () => {
            const categoryId = button.getAttribute("data-category-id");
            // console.log("Danh mục được chọn:", categoryId);
          });
        });
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh mục:", error);
    });
}
function displayCategoriesForEditForm() {
  fetchCategories()
    .then((categories) => {
      const categoryContainer = document.getElementById("editProductCategory");
      categoryContainer.innerHTML = ""; 

      categories.forEach((category) => {
        const categoryOption = `
          <option value="${category.id}" data-category-id="${category.id}">${category.name}</option>
        `;
        categoryContainer.innerHTML += categoryOption;
      });

      categoryContainer.addEventListener("change", () => {
        // const selectedCategoryId = categoryContainer.value;
        // // console.log("Danh mục được chọn:", selectedCategoryId);
      });
    })
    .catch((error) => {
      console.error("Lỗi khi lấy danh mục:", error);
    });
}



export { displayCategoriesAddForm, displayCategoriesForEditForm  };
