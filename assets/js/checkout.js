import {
  displayCartItemsCheckout,
  displayUserPay,
} from "./markups/checkoutMarkups.js";
import { updateCartNumber, updateHeader } from "./utils/updateHeader.js";
import { addOrder } from "./api/api.js";
import { SuccessMessage } from "./utils/utilsAdmin.js";
import { getOrderDataFrom } from "./utils/getDataUtils.js";
import { registerUser, loginUser } from "./user.js";

document.addEventListener("DOMContentLoaded", function () {
  displayCartItemsCheckout();
  displayUserPay();
  updateHeader();
  updateCartNumber();
  loginUser();
  registerUser();

  const orderButton = document.querySelector(".button-cta");
  orderButton.addEventListener("click", async function () {
    try {
      const orderData = getOrderDataFrom();
      const isFormValid = validateOrderData(orderData);
      if (!isFormValid) {
        SuccessMessage("Vui lòng nhập đầy đủ thông tin.");

        return;
      }

      const paymentMethod = orderData.paymentMethod;
      if (!paymentMethod) {
        SuccessMessage("Vui lòng chọn phương thức thanh toán.");
        return;
      }

      if (paymentMethod === "cod") {
        await addOrder(orderData);
        handleOrderSuccess();
      } else if (paymentMethod === "bank-transfer") {
        handleBankTransfer(orderData);
      } else {
        console.error(
          "Phương thức thanh toán không được hỗ trợ:",
          paymentMethod
        );
      }
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
    }
  });
  function validateOrderData(orderData) {
    console.log(orderData); // Thêm dòng này để ghi log orderData
    return (
      orderData.name &&
      orderData.address &&
      orderData.phoneNumber &&
      orderData.email
    );
  }

  function handleOrderSuccess() {
    SuccessMessage("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    window.setTimeout(function () {
      window.location.href = "index.html";
    }, 3000);
  }

  function handleBankTransfer(orderData) {
    localStorage.setItem("userData", JSON.stringify(orderData));
    window.location.href = "paymentNH.html";
  }
});
