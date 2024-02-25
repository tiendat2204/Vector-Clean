function getPaginationItemTemplate(pageNumber, isActive) {
    const activeClass = isActive ? ' active' : '';
    return `
      <li class="product-to-page-item">
        <a href="#" class="product-to-page-number${activeClass}">
          ${pageNumber}
        </a>
      </li>
    `;
  }
  function displayPagination(totalItems, currentPage, itemsPerPage, onPageClick) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const productToPage = document.querySelector(".product-to-page");
    productToPage.innerHTML = "";
  
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      const pageItemTemplate = getPaginationItemTemplate(i, isActive);
      const pageItem = new DOMParser().parseFromString(pageItemTemplate, 'text/html').body.firstChild;
  
      pageItem.addEventListener('click', (event) => {
        event.preventDefault();
        onPageClick(i); 
      });
  
      productToPage.appendChild(pageItem);
    }
  }
  
  export { displayPagination };