function SuccessMessage(successMessage: string): void {
  hideSuccessNotification();

  const successNotification: string = createSuccessNotification(successMessage);
  document.body.insertAdjacentHTML("beforeend", successNotification);

  setTimeout(() => {
    hideSuccessNotification();
  }, 4000);
}

function hideSuccessNotification(): void {
  const notificationsContainer: HTMLElement | null = document.querySelector(
    ".notifications-container"
  );
  if (notificationsContainer) {
    notificationsContainer.remove();
  }
}

function createSuccessNotification(message: string): string {
  return `
      <div class="notifications-container">
        <div class="success">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="success-prompt-wrap">
              <p class="success-prompt-heading">${message}</p>
              <div class="success-button-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

function updateSidebar(): void {
  const user: any = JSON.parse(localStorage.getItem("user") || "");
  const accountInfoName: HTMLElement | null =
    document.querySelector(".account-info-name");
  if (accountInfoName) {
    accountInfoName.textContent = user ? user.username : "Đăng nhập";
  }
}

function closeModal(): void {
  const modal: HTMLElement | null = document.querySelector(".modal-product");
  if (modal) {
    modal.style.display = "none";
  }
}

function openModal(): void {
  const modal: HTMLElement | null = document.querySelector(".modal-product");
  if (modal) {
    modal.style.display = "flex";
  }
}

function openEditProduct(): void {
  const modalEdit: HTMLElement | null = document.querySelector(".form-edit");
  if (modalEdit) {
    modalEdit.style.display = "block";
  }
}

function closeEditProduct(): void {
  const modalEdit: HTMLElement | null = document.querySelector(".form-edit");
  if (modalEdit) {
    modalEdit.style.display = "none";
  }
}

function fillEditForm(product: any, categories: any[]): void {
    openEditProduct();
    const editForm: HTMLFormElement | null = document.getElementById("editProduct") as HTMLFormElement;
    if (editForm) {
        (editForm.querySelector('.form-edit input[name="name"]') as HTMLInputElement).value = product.name;
        (editForm.querySelector('.form-edit input[name="price"]') as HTMLInputElement).value = product.price;
        (editForm.querySelector('.form-edit input[name="description"]') as HTMLInputElement).value = product.description;
        (editForm.querySelector('.form-edit select[name="status"]') as HTMLSelectElement).value = product.status;
        const categoryName: string = categories.find((cat) => cat.id === product.categoryId)?.name || "";
        const categoryOptions: NodeListOf<HTMLOptionElement> = editForm.querySelectorAll('select[name="category"] option');
        categoryOptions.forEach((option) => {
            if (option.dataset.categoryId === String(product.categoryId)) {
                option.selected = true;
            }
        });
    }
}

function openAddCategoryModal(): void {
  const modal: HTMLElement | null = document.querySelector(
    ".add-category-modal"
  );
  if (modal) {
    modal.style.display = "block";
  }
}

function closeAddCategoryModalHandler(): void {
  const modal: HTMLElement | null = document.querySelector(
    ".add-category-modal"
  );
  if (modal) {
    modal.style.display = "none";
  }
}

function openEditCategoryModal(): void {
  const modalEdit: HTMLElement | null = document.querySelector(
    ".edit-category-modal"
  );
  if (modalEdit) {
    modalEdit.style.display = "block";
  }
}

function closeEditCategoryModal(): void {
  const modalEdit: HTMLElement | null = document.querySelector(
    ".edit-category-modal"
  );
  if (modalEdit) {
    modalEdit.style.display = "none";
  }
}
function fillEditFormCategory(category: any): void {
    openEditCategoryModal();

    const editForm: HTMLFormElement | null = document.getElementById("editFormCategory") as HTMLFormElement;
    if (editForm) {
        (editForm.querySelector('.edit-category-modal input[name="id"]') as HTMLInputElement).value = category.id;
        (editForm.querySelector('.edit-category-modal input[name="name"]') as HTMLInputElement).value = category.name;
        (editForm.querySelector('.edit-category-modal select[name="status"]') as HTMLSelectElement).value = category.status;
    }
}


function closeEditOrderModal(): void {
  const modal: HTMLElement | null = document.querySelector("#edit-order-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

function openEditOrderModal(): void {
  const modal: HTMLElement | null = document.querySelector("#edit-order-modal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function fillEditOrderModal(orderDetails: any): void {
    openEditOrderModal();
    (document.getElementById("customer-name-input") as HTMLInputElement).value = orderDetails.name;
    (document.getElementById("customer-phone-input") as HTMLInputElement).value = orderDetails.phoneNumber;
    (document.getElementById("customer-email-input") as HTMLInputElement).value = orderDetails.email;
    (document.getElementById("customer-address-input") as HTMLInputElement).value = orderDetails.address;
    (document.getElementById("order-status-select") as HTMLSelectElement).value = orderDetails.status;
}
export {
  SuccessMessage,
  closeModal,
  fillEditForm,
  closeEditProduct,
  openAddCategoryModal,
  closeAddCategoryModalHandler,
  fillEditFormCategory,
  closeEditCategoryModal,
  updateSidebar,
  closeEditOrderModal,
  fillEditOrderModal,
};
