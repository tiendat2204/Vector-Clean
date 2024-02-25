import { displayCartItemsCheckout } from "./markups/checkoutMarkups.js";
import { updateCartNumber, updateHeader } from "./utils/updateHeader.js";
import { getOrderDataFrom } from "./utils/getDataUtils.js";
import { addOrder } from "./api/api.js";
import { SuccessMessage } from "./utils/utilsAdmin.js";
document.addEventListener("DOMContentLoaded", function () {
  displayCartItemsCheckout();
  updateHeader();
  updateCartNumber();

  const orderButton = document.querySelector(".button-cta");
  orderButton.addEventListener("click", async function () {
    try {
      const orderData = getOrderDataFrom();
      const responseData = await addOrder(orderData);
      localStorage.removeItem("cart");
      SuccessMessage("Đặt hàng thành công!");
      window.setTimeout(function() {
        window.location.href = "index.html";
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
    }
  });
});
