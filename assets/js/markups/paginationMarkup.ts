function getPaginationItemTemplate(pageNumber: number, isActive: boolean): string {
    const activeClass = isActive ? ' active' : '';
    return `
      <li class="product-to-page-item">
        <a href="#" class="product-to-page-number${activeClass}">
          ${pageNumber}
        </a>
      </li>
    `;
  }
  
  function displayPagination(totalItems: number, currentPage: number, itemsPerPage: number, onPageClick: (pageNumber: number) => void): void {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const productToPage = document.querySelector<HTMLDivElement>('.product-to-page');
    if (productToPage) {
      productToPage.innerHTML = '';
  
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const pageItemTemplate = getPaginationItemTemplate(i, isActive);
        const parser = new DOMParser();
        const pageItem = parser.parseFromString(pageItemTemplate, 'text/html').body.firstChild as HTMLLIElement;
  
        pageItem.addEventListener('click', (event) => {
          event.preventDefault();
          onPageClick(i);
        });
  
        productToPage.appendChild(pageItem);
      }
    }
  }
  
  export { displayPagination };
  