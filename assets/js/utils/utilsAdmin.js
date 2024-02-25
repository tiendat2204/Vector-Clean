function SuccessMessage(successMessage) {
  const successNotification = createSuccessNotification(successMessage);
  document.body.insertAdjacentHTML("beforeend", successNotification);
  setTimeout(() => {
    hideSuccessNotification();
  }, 4000);
}

function hideSuccessNotification() {
  const notificationsContainer = document.querySelector(
    ".notifications-container"
  );
  if (notificationsContainer) {
    notificationsContainer.remove();
  }
}
function updateSidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const accountInfoName = document.querySelector(".account-info-name");
  if (user) {
    accountInfoName.textContent = user.username;
  } else {
    accountInfoName.textContent = "Đăng nhập";
  }
}

function createSuccessNotification(message) {
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

function closeModal() {
  const modal = document.querySelector(".modal-product");
  modal.style.display = "none";
}

function openModal() {
  const modal = document.querySelector(".modal-product");
  modal.style.display = "flex";
}
function openEditProduct() {
  const modalEdit = document.querySelector(".form-edit");
  modalEdit.style.display = "block";
}
function closeEditProduct() {
  const modalEdit = document.querySelector(".form-edit");
  modalEdit.style.display = "none";
}

function fillEditForm(product, categories) {
  openEditProduct();
  const editForm = document.getElementById("editProduct");
  editForm.querySelector('.form-edit input[name="name"]').value = product.name;
  editForm.querySelector('.form-edit input[name="price"]').value =
    product.price;
  editForm.querySelector('.form-edit input[name="description"]').value =
    product.description;
  editForm.querySelector('.form-edit select[name="status"]').value =
    product.status;
  const categoryName =
    categories.find((cat) => cat.id === product.categoryId)?.name || "";
  const categoryOptions = editForm.querySelectorAll(
    'select[name="category"] option'
  );
  categoryOptions.forEach((option) => {
    if (option.dataset.categoryId === String(product.categoryId)) {
      option.selected = true;
    }
  });
}

function openAddCategoryModal() {
  const modal = document.querySelector(".add-category-modal");
  modal.style.display = "block";
}

function closeAddCategoryModalHandler() {
  const modal = document.querySelector(".add-category-modal");
  modal.style.display = "none";
}
function openEditCategoryModal() {
  const modalEdit = document.querySelector(".edit-category-modal");
  modalEdit.style.display = "block";
}
function closeEditCategoryModal() {
  const modalEdit = document.querySelector(".edit-category-modal");
  modalEdit.style.display = "none";
}
function fillEditFormCategory(category) {
  openEditCategoryModal();

  const editForm = document.getElementById("editFormCategory");
  editForm.querySelector('.edit-category-modal input[name="id"]').value =
    category.id;
  editForm.querySelector('.edit-category-modal input[name="name"]').value =
    category.name;
  editForm.querySelector('.edit-category-modal select[name="status"]').value =
    category.status;
}

function closeEditOrderModal() {
  const modal = document.querySelector("#edit-order-modal");
  modal.style.display = "none";
}
function openEditOrderModal() {
  const modal = document.querySelector("#edit-order-modal");
  modal.style.display = "flex";
}

function fillEditOrderModal(orderDetails) {
  openEditOrderModal();
  document.getElementById("customer-name-input").value = orderDetails.name;
  document.getElementById("customer-phone-input").value = orderDetails.phoneNumber;
  document.getElementById("customer-email-input").value = orderDetails.email;
  document.getElementById("customer-address-input").value = orderDetails.address;
  document.getElementById("order-status-select").value = orderDetails.status;
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
  fillEditOrderModal
};
