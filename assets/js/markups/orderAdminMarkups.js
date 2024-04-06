import {
  fetchOrders,
  fetchOrderDetails,
  updateOrder,
  deleteOrder,
} from "../api/api.js";
import {
  closeEditOrderModal,
  fillEditOrderModal,
  SuccessMessage,
} from "../utils/utilsAdmin.js";
import { getDataAdminEditOrder } from "../utils/getDataUtils.js";
import { formatPrice } from "../utils/formatPrice.js";
async function displayOrdersAdmin() {
  const orders = await fetchOrders();
  document.getElementById("orders-body").innerHTML = "";

  orders.forEach((order) => {
    const orderDetails = order.products

      .map(
        (product) => `
      <div class="order-detail-all">
        <div class="order-detail-img">
          <img src="./assets/img/${product.image}" alt="${
          product.name
        }" class="product-image-admin">
        </div>
        <div class="order-detail">
          <span class="product-detail"><strong>Sản phẩm:</strong> ${
            product.name
          }</span>
          <span class="product-price"><strong>Giá:</strong> ${formatPrice(
            product.price
          )}</span>
          <span class="product-size"><strong>Size:</strong> ${
            product.size
          }</span>
          <span class="product-quantity"><strong>Số lượng:</strong> ${
            product.quantity
          }</span>
        </div>
      </div>
    `
      )
      .join("");

    const orderRow = `
      <tr class="orders-row">    
        <td class="infoUser-td">
          <div class="customer-info">
            <span class="customer-name"><strong>Họ và tên:</strong> ${order.name}</span>
            <span class="customer-phone"><strong>Số điện thoại:</strong> ${order.phoneNumber}</span>
            <span class="customer-email"><strong>Email:</strong> ${order.email}</span>
            <span class="customer-address"><strong>Địa chỉ:</strong> ${order.address}</span>
          </div>
        </td>
        <td class="status-order-td">
          <span class="cell-label">Status:</span>
          <span class="status active">${order.status}</span>
        </td>
        <td class="order-detail-td">
          ${orderDetails}
        </td>
        <td class="function-td">
          <button class="change-btn-orders" data-id="${order.id}">Chỉnh sửa</button>
          <button class="delete-btn-orders" data-id="${order.id}">Xóa</button>
        </td>
      </tr>
    `;
    document
      .getElementById("orders-body")
      .insertAdjacentHTML("beforeend", orderRow);
  });
  attachButtonEvents();
}
function attachButtonEvents() {
  document.addEventListener("click", async function handleClick(event) {
    const orderId = event.target.dataset.id;

    if (event.target.classList.contains("change-btn-orders")) {
      try {
        await editOrder(orderId);
      } catch (error) {
        console.error(error);
      }
    } else if (event.target.classList.contains("delete-btn-orders")) {
      document.removeEventListener("click", handleClick);

      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
      if (confirmDelete) {
        try {
          await deleteOrder(orderId);
          displayOrdersAdmin();
          SuccessMessage("Đã xóa đơn hàng thành công!");
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
}
async function editOrder(orderId) {
  const orderToEdit = await getOrderDetails(orderId);
  fillEditOrderModal(orderToEdit);

  const submitButton = document.querySelector("#save-changes-btn-orders");

  submitButton.removeEventListener("click", handleSaveChanges);
  submitButton.addEventListener("click", handleSaveChanges);

  async function handleSaveChanges(event) {
    event.preventDefault();

    submitButton.removeEventListener("click", handleSaveChanges);

    const editedOrderData = getDataAdminEditOrder();
    delete orderToEdit._id;
    const updatedOrderData = {
      ...orderToEdit,
      ...editedOrderData,
    };
    console.log(updatedOrderData);
    await updateOrder(orderId, updatedOrderData);

    displayOrdersAdmin();
    closeEditOrderModal();
    SuccessMessage("Chỉnh sửa đơn hàng thành công!");
  }
}

async function getOrderDetails(orderId) {
  try {
    const orderDetails = await fetchOrderDetails(orderId);
    return orderDetails;
  } catch (error) {
    console.error(error);
  }
}

export { displayOrdersAdmin };
