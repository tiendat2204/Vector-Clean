import { SuccessMessage } from "../utils/utilsAdmin.js";
import { fetchOrders, updateUser } from "../api/api.js";
import { formatPrice } from "../utils/formatPrice.js";

function displayUserInfo() {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    const avatarImg = document.querySelector(".avatar-user img");
    const pictureURL = userData.picture;

    avatarImg.src = pictureURL;

    document.getElementById("username").value =
      userData.username || "Chưa có thông tin";
    document.getElementById("email-user").value =
      userData.email || "Chưa có thông tin";
    document.getElementById("address-user").value =
      userData.address || "Chưa có thông tin";
    document.getElementById("phone-user").value =
      userData.phoneNumber || "Chưa có thông tin";

    document
      .querySelector(".update-user")
      .addEventListener("click", function () {
        const newUsername = document.getElementById("username").value;
        const newEmail = document.getElementById("email-user").value;
        const newAddress = document.getElementById("address-user").value;
        const newPhoneNumber = document.getElementById("phone-user").value;

        const updatedUserData = {
          ...userData,
          name: newUsername,
          email: newEmail,
          address: newAddress,
          phoneNumber: newPhoneNumber,
        };
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        SuccessMessage("Thông tin đã được cập nhật!");
      });
  } else {
    document.getElementById("username").value = "Chưa có thông tin";
    document.getElementById("email-user").value = "Chưa có thông tin";
    document.getElementById("address-user").value = "Chưa có thông tin";
    document.getElementById("phone-user").value = "Chưa có thông tin";
  }
}
async function updateUserPassword(userID, newPassword) {
  try {
    const userData = { password: newPassword };
    console.log(userData);
    await updateUser(userID, userData);
    SuccessMessage("Mật khẩu đã được cập nhật!");
  } catch (error) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
    ErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại sau!");
  }
}
document
  .querySelector(".change-password")
  .addEventListener("click", function () {
    document.querySelector(".change-password-container").style.display =
      "block";
    document.querySelector(".change-password").style.display = "none";
  });

document
  .querySelector(".confirm-password-change")
  .addEventListener("click", async function () {
    const newPassword = document.getElementById("new-password").value;
    const confirmNewPassword = document.getElementById(
      "confirm-new-password"
    ).value;

    if (newPassword !== confirmNewPassword) {
      ErrorMessage("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    const userID = userData.id;

    try {
      await updateUserPassword(userID, newPassword);

      document.querySelector(".change-password-container").style.display =
        "none";
      document.querySelector(".change-password").style.display = "block";

      document.getElementById("current-password").value = "";
      document.getElementById("new-password").value = "";
      document.getElementById("confirm-new-password").value = "";
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      ErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại sau!");
    }
  });

async function displayUserOrderHistory(userID) {
  try {
    const allOrders = await fetchOrders();

    const userOrders = allOrders.filter((order) => order.userId === userID);

    const orderContainer = document.querySelector(".order-container");

    orderContainer.innerHTML = "";

    if (userOrders.length === 0) {
      const noOrderMessage = document.createElement("h1");
      noOrderMessage.textContent = "Chưa có đơn hàng nào!!";
      orderContainer.appendChild(noOrderMessage);
    } else {
      userOrders.forEach((order) => {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-container");

        const orderInfo = document.createElement("div");
        orderInfo.classList.add("order-info");

        const orderID = order.id;
        orderInfo.innerHTML = `
            <p><strong>Mã Đơn Hàng:</strong> ${orderID}</p>
            <p><strong>Ngày Đặt Hàng:</strong> ${order.createdAt}</p>
            <p><strong>Trạng Thái:</strong> ${order.status}</p>
            <p><strong>Sản Phẩm:</strong></p>
            <ul id="product-list-${orderID}">
            </ul>
            <button class="toggle-detail-button" data-order-id="${orderID}">Xem Chi Tiết</button>
            <button class="cancel-order-button">Hủy Đơn Hàng</button>
          `;

        orderElement.appendChild(orderInfo);
        orderContainer.appendChild(orderElement);
      });

      const toggleDetailButtons = document.querySelectorAll(
        ".toggle-detail-button"
      );
      toggleDetailButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const orderID = button.getAttribute("data-order-id");
          const productList = document.getElementById(
            `product-list-${orderID}`
          );
          productList.innerHTML = "";

          const order = userOrders.find((order) => order.id === orderID);
          if (order) {
            order.products.forEach((product) => {
              const productItem = document.createElement("li");
              productItem.classList.add("product-item");
              productItem.innerHTML = `
                  <div class="product-content">
                    <div class="product-info">
                      <strong>Tên Sản Phẩm:</strong> ${product.name}<br>
                      <strong>Giá:</strong> ${formatPrice(product.price)}<br>
                      <strong>Size:</strong> ${product.size}<br>
                      <strong>Số Lượng:</strong> ${product.quantity}
                    </div>
                    <div class="product-image-container">
                      <img src="./assets/img/${product.image}" alt="${
                product.name
              }" class="product-image">
                    </div>
                  </div>
                `;
              productList.appendChild(productItem);
            });

            const buttonText = button.textContent;
            if (buttonText === "Xem Chi Tiết") {
              button.textContent = "Ẩn Chi Tiết";
            } else {
              button.textContent = "Xem Chi Tiết";
              productList.innerHTML = "";
            }
          }
        });
      });
    }
  } catch (error) {
    console.error("Lỗi khi hiển thị lịch sử mua hàng:", error);
  }
}

export { displayUserInfo, displayUserOrderHistory };
