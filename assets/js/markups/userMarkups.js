import { fetchOrders } from "../api/api.js";
import { formatPrice } from "../utils/formatPrice.js";
function getUserIdFromLocalStorage() {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    return user.id;
  } else {
    console.error("Không tìm thấy thông tin người dùng trong local storage.");
    return null;
  }
}
function displayUserInfo() {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    const userInfoContainer = document.querySelector(".col-md-5");
    userInfoContainer.innerHTML = `
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Cài Đặt Hồ Sơ</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-5">
                <label class="labels">Tên</label>
                <input type="text" class="form-control" placeholder="Tên" value="${user.username}">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-5">
                <label class="labels">Số Điện Thoại Di Động</label>
                <input type="text" class="form-control" placeholder="Nhập số điện thoại" value="${user.phoneNumber}">
              </div>
              <div class="col-md-5">
                <label class="labels">Email</label>
                <input type="text" class="form-control" placeholder="Nhập Email" value="${user.email}">
              </div>
            </div>
            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button" type="button">Lưu Hồ Sơ</button>
            </div>
          </div>
      `;
  } else {
    console.error("Không tìm thấy thông tin người dùng trong local storage.");
  }
}

async function displayUserOrders() {
  const userId = getUserIdFromLocalStorage();
  if (!userId) {
    console.error("Không thể tìm thấy id người dùng.");
    return;
  }

  try {
    const orders = await fetchOrders();

    const userOrders = orders.filter((order) => order.userId === userId);

    const ordersContainer = document.querySelector(".order-container");
    ordersContainer.innerHTML = "";

    userOrders.forEach((order) => {
      const orderElement = document.createElement("div");
      orderElement.classList.add("order-info");

      orderElement.innerHTML = `
                <p><strong>Mã Đơn Hàng:</strong> ${order.id}</p>
                <p><strong>Ngày Đặt Hàng:</strong> ${order.createdAt}</p>
                <p><strong>Trạng Thái:</strong> <span style="color: ${
                  order.status === "Đã hủy" ? "red" : "green"
                }">${order.status}</span></p>
                  
                <p><strong>Sản Phẩm:</strong></p>
                <ul>
                    ${order.products
                      .map(
                        (product) => `
                        <li>
                        <div class="product-content">
                            <div class="product-info">
                                <strong>Tên Sản Phẩm:</strong> ${
                                  product.name
                                }<br>
                                <strong>Giá:</strong> ${formatPrice(
                                  product.price
                                )} <br>
                                <strong>Size:</strong> ${product.size}<br>
                                <strong>Số Lượng:</strong> ${product.quantity}
                            </div>
                            <div class="product-image-container">
                                <img src="./assets/img/${product.image}" alt="${
                          product.name
                        }" class="product-image">
                            </div>
                            </div>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            `;

      ordersContainer.appendChild(orderElement);
    });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi lấy danh sách đơn hàng:", error);
  }
}

export { displayUserOrders, displayUserInfo };
