import { displayUserOrders, displayUserInfo } from "./markups/userMarkups.js";
import { updateHeader, updateCartNumber } from "./utils/updateHeader.js";

async function mainHomeLogic() {
  updateHeader();
  displayUserOrders();
  displayUserInfo();
  updateCartNumber();
}
document.addEventListener("DOMContentLoaded", mainHomeLogic);
