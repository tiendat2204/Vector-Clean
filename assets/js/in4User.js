import {
  displayUserInfo,
  displayUserOrderHistory,
} from "./markups/userMarkups.js";
import { updateHeader, updateCartNumber } from "./utils/updateHeader.js";

async function mainHomeLogic() {
  updateHeader();
  displayUserInfo();
  updateCartNumber();

  const userData = JSON.parse(localStorage.getItem("user"));
  if (userData) {
    const userID = userData.id;
    displayUserOrderHistory(userID);
  } else {
    console.error("Không tìm thấy thông tin người dùng trong localStorage.");
  }
}

document.addEventListener("DOMContentLoaded", mainHomeLogic);
