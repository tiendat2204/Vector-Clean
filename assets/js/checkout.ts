import { displayCartItemsCheckout } from "./markups/checkoutMarkups.js";
import { updateCartNumber, updateHeader } from "./utils/updateHeader.js";
import { addOrder } from "./api/api.js";
import { SuccessMessage } from "./utils/utilsAdmin.js";
import { getOrderDataFrom } from "./utils/getDataUtils.js";

document.addEventListener("DOMContentLoaded", function () {
  displayCartItemsCheckout();
  updateHeader();
  updateCartNumber();

  const orderButton = document.querySelector(".button-cta");
  if (orderButton) {
    orderButton.addEventListener("click", async function () {
      try {
        const orderData = getOrderDataFrom();
        const paymentMethod = orderData.paymentMethod;

        if (paymentMethod === "cod") {
          const responseData = await addOrder(orderData);
          localStorage.removeItem("cart");
          SuccessMessage("Đặt hàng thành công!");
          window.setTimeout(function () {
            window.location.href = "index.html";
          }, 3000);
          return;
        } else if (paymentMethod === "bank-transfer") {
          localStorage.setItem("userData", JSON.stringify(orderData));
          window.location.href = "paymentNH.html";
          return;
        } else {
          // Xử lý trường hợp khác (nếu có)
          console.error("Phương thức thanh toán không được hỗ trợ:", paymentMethod);
          return;
        }
      } catch (error) {
        console.error("Lỗi khi gửi đơn hàng:", error);
      }
    });
  }
});
