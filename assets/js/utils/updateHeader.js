import { getCartFromLocalStorage } from "./cartUtils.js";

function updateCartNumber() {
  const navCartNumber = document.querySelector(".nav-cart-number");
  const cart = getCartFromLocalStorage();
  const totalItems = cart.length;
  navCartNumber.textContent = totalItems.toString();
}

function logout() {
  localStorage.removeItem("user");
  updateHeader();
}

function updateHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const optionUserBtn = document.querySelector(".option-user-btn");

  if (user) {
    optionUserBtn.innerHTML = `
      <span class="username">Xin chào, ${user.username}</span>
      <span class="logout-btn">Đăng Xuất</span>
    `;

    const logoutButton = optionUserBtn.querySelector(".logout-btn");
    logoutButton.addEventListener("click", logout);
  } else {
    optionUserBtn.innerHTML = `
      <a href="#" onclick="openForm('loginForm')"> <span class="login-btn">Đăng Nhập</span></a>
      <a href="#" onclick="openForm('registerForm')">  <span class="register-btn">Đăng Kí</span></a>
    `;
  }
}

export { updateCartNumber, updateHeader, logout };
