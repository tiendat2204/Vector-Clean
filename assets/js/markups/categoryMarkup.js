import { fetchProductsByCategory } from "../api/api.js";
import { getProductHTML } from "./productMarkup.js";

function displayCategories(categories) {
  const categoryContainer = document.querySelector(".category ul");

  categories.forEach((category) => {
    const categoryHTML = `
      <li><a href="./category.html?category=${category.id}/product" class="shoe-category" data-category-id="${category.id}">${category.name}</a></li>
    `;

    categoryContainer.innerHTML += categoryHTML;
  });

  const allCategory = document.querySelectorAll(".shoe-category");

  allCategory.forEach((categoryLink) => {
    categoryLink.addEventListener("click", (event) => {
      event.preventDefault();

      const categoryId = categoryLink.dataset.categoryId;
      console.log(typeof categoryId);
      fetchProductsByCategory(categoryId).then((products) => {
        getProductHTML(products);
      });

      allCategory.forEach((classElement) => {
        classElement.classList.remove("active");
      });

      categoryLink.classList.add("active");
    });
  });
}

export { displayCategories };
