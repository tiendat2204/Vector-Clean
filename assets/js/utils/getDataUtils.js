
function getDataAdmin() {
  const name = document.querySelector(
    '.modal-product input[name="name"]'
  ).value;
  const price = document.querySelector(
    '.modal-product input[name="price"]'
  ).value;
  const description = document.querySelector(
    '.modal-product input[name="description"]'
  ).value;
  const status = document.querySelector(
    '.modal-product select[name="status"]'
  ).value;

  const imageInput = document.querySelector(
    '.modal-product input[type="file"]'
  );
  const image = imageInput.files.length > 0 ? imageInput.files[0].name : "";

  const categorySelect = document.querySelector(
    '.modal-product select[name="category"]'
  );
  const categoryId = categorySelect
    ? categorySelect.options[categorySelect.selectedIndex].getAttribute(
        "data-category-id"
      )
    : null;

  const productData = {
    name,
    price,
    description,
    categoryId,
    status,
    image,
  };

  return productData;
}

function getDataAdminEditProduct() {
  const name = document.querySelector('.form-edit input[name="name"]').value;
  const price = document.querySelector('.form-edit input[name="price"]').value;
  const description = document.querySelector(
    '.form-edit input[name="description"]'
  ).value;
  const status = document.querySelector(
    '.form-edit select[name="status"]'
  ).value;
  const imageInput = document.querySelector('.form-edit input[type="file"]');
  const image = imageInput.files.length > 0 ? imageInput.files[0].name : "";

  const categorySelect = document.querySelector(
    '.form-edit select[name="category"]'
  );
  const categoryId = categorySelect
    ? categorySelect.options[categorySelect.selectedIndex].getAttribute(
        "data-category-id"
      )
    : null;

  const productData = {
    name,
    price,
    description,
    categoryId,
    status,
    image,
  };

  return productData;
}
function getDataAdminEditCategory() {
  const name = document.querySelector(
    '.edit-category-modal input[name="name"]'
  ).value;
  const status = document.querySelector(
    '.edit-category-modal select[name="status"]'
  ).value;

  const categoryData = {
    name,
    status,
  };

  return categoryData;
}
function getOrderDataFrom() {
  const name = document.getElementById("name").value;
  const phoneNumber = document.getElementById("phone-number").value;
  const email = document.getElementById("email-out").value;
  const address = document.getElementById("address").value;

  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const products = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    size: item.size,
    image: item.image,
    quantity: item.quantity,
  }));

  const userId = JSON.parse(localStorage.getItem("user"));
  const highestOrderId = parseInt(localStorage.getItem("highestOrderId")) || 0;
  const newOrderId = highestOrderId + 1;
  localStorage.setItem("highestOrderId", newOrderId.toString());
  const currentDate = new Date(); // Lấy ngày hiện tại
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`; // Định dạng ngày thành 'YYYY-MM-DD'

  const order = {
    id: newOrderId.toString(),
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    address: address,
    products: products,
    userId: userId.id,
    status: "Chờ xác nhận",
    createdAt: formattedDate,
  };
  return order;
}
function getDataAdminEditOrder() {
  const editedOrderData = {
    // Lấy thông tin mới từ các trường trong form chỉnh sửa đơn hàng
    name: document.getElementById("customer-name-input").value,
    phoneNumber: document.getElementById("customer-phone-input").value,
    email: document.getElementById("customer-email-input").value,
    address: document.getElementById("customer-address-input").value,
    status: document.getElementById("order-status-select").value,
    // Các trường khác tùy thuộc vào giao diện và cách bạn tổ chức dữ liệu
  };
  return editedOrderData;
}

export {
  getDataAdmin,
  getDataAdminEditProduct,
  getDataAdminEditCategory,
  getOrderDataFrom,
  getDataAdminEditOrder,
};
