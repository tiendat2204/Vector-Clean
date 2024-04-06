import { fetchProducts, fetchCategories, getProductDetails, updateProduct, deleteProduct } from "../api/api.js";
import { formatPrice } from "../utils/formatPrice.js";
import { fillEditForm, closeEditProduct, SuccessMessage } from "../utils/utilsAdmin.js";
import { getDataAdminEditProduct } from "../utils/getDataUtils.js";

function createProductMarkup(product, categories) {
  const categoryName = categories.find((cat) => cat.id === product.categoryId)?.name || "Không xác định";

  return `
    <div class="products-row">
      <button class="cell-more-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-more-vertical"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
      <div class="product-cell image">
        <img src="./assets/img/${product.image}" alt="${product.name}" />
        <span>${product.name}</span>
      </div>
      <div class="product-cell category">
        <span class="cell-label">Category:</span>${categoryName}
      </div>
      <div class="product-cell status-cell">
        <span class="cell-label">Status:</span>
        <span class="status ${product.status === "Active" ? "active" : product.status === "Block" ? "disabled" : ""}">${product.status}</span>
      </div>
      <div class="product-cell description">
        <span class="cell-label">Mô tả:</span>${product.description}
      </div>
      <div class="product-cell price">
        <span class="cell-label">Price:</span>${formatPrice(product.price)}
      </div>
      <div class="product-cell function">
        <button class="change-btn" data-id="${product.id}">Chỉnh sửa</button>
        <button class="delete-btn" data-id="${product.id}">Xóa</button>
      </div>
    </div>
  `;
}

function attachButtonEvents() {
  document.addEventListener("click", async (event) => {
    const productId = event.target.getAttribute("data-id");

    if (event.target.classList.contains("change-btn")) {
      try {
        const { categories } = await displayProductsAdmin();
        await editProduct(productId, categories);
      } catch (error) {
        console.error(error);
      }
    } else if (event.target.classList.contains("delete-btn")) {
      try {
        await deleteProductId(productId);
      } catch (error) {
        console.error(error);
      }
    }
  });
}
async function editProduct(productId, categories) {
  const productToEdit = await getProductDetails(productId);
  fillEditForm(productToEdit, categories);

  const submitButton = document.querySelector("#editProduct .submit-save");

  const imageInput = document.getElementById("imageInput");

  async function onSubmitButtonClick(event) {
    event.preventDefault();

    const editedProductData = getDataAdminEditProduct();
    submitButton.removeEventListener("click", onSubmitButtonClick);

    if (imageInput && imageInput.files && imageInput.files.length > 0) {
      const newImageName = imageInput.files[0].name;
      editedProductData.image = newImageName;
    } else {
      editedProductData.image = productToEdit.image;
    }

    await updateProduct(productId, editedProductData);
    closeEditProduct();
    displayProductsAdmin();
    SuccessMessage("Chỉnh sửa sản phẩm thành công!");
  }

  submitButton.addEventListener("click", onSubmitButtonClick);
}

async function deleteProductId(productId) {
  await deleteProduct(productId);
  displayProductsAdmin();
  SuccessMessage("Xóa sản phẩm thành công!");
}

async function displayProductsAdmin() {
  const productContainer = document.getElementById("productContainerAdminVip");
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

  const productMarkupArray = products.map((product) => createProductMarkup(product, categories));
  if (productContainer) {
    productContainer.innerHTML = productMarkupArray.join("");
  }
  return { products, categories };
}

attachButtonEvents();

export { displayProductsAdmin, editProduct, deleteProductId };
