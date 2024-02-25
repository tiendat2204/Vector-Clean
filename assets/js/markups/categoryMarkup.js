// markups/categoryMarkup.js
import { fetchProductsByCategory } from "../api/api.js";
import { getProductHTML } from "./productMarkup.js";
function displayCategories(categories) {
  const categoryContainer = document.querySelector(".category ul");

  categories.forEach((category) => {
    const categoryHTML = `
      <li><span class="shoe-category" data-category-id="${category.id}">${category.name}</span></li>
    `;

    categoryContainer.innerHTML += categoryHTML;
  });

  const allCategory = document.querySelectorAll(".shoe-category");

  allCategory.forEach((categorySpan) => {
    categorySpan.addEventListener("click", () => {
      const categoryId = categorySpan.dataset.categoryId;
      fetchProductsByCategory(categoryId).then((products) => {
        getProductHTML(products);
      });

      allCategory.forEach((classElement) => {
        classElement.classList.remove("active");
      });

      categorySpan.classList.add("active");
    });
  });
}

export { displayCategories };
