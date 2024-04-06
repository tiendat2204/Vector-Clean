import { fetchProductsByCategory } from '../api/api';
import { getProductHTML } from './productMarkup';

function displayCategories(categories: { id: string; name: string }[]): void {
  const categoryContainer = document.querySelector<HTMLUListElement>('.category ul');

  categories.forEach((category) => {
    const categoryHTML = `
      <li><span class="shoe-category" data-category-id="${category.id}">${category.name}</span></li>
    `;

    if (categoryContainer) {
      categoryContainer.innerHTML += categoryHTML;
    }
  });

  const allCategory = document.querySelectorAll<HTMLSpanElement>('.shoe-category');

  allCategory.forEach((categorySpan) => {
    categorySpan.addEventListener('click', () => {
      const categoryId = categorySpan.dataset.categoryId;
      if (categoryId) {
        fetchProductsByCategory(categoryId).then((products) => {
          getProductHTML(products);
        });

        allCategory.forEach((classElement) => {
          classElement.classList.remove('active');
        });

        categorySpan.classList.add('active');
      }
    });
  });
}

export { displayCategories };
