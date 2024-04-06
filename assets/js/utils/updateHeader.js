import { getCartFromLocalStorage } from "./cartUtils.js";

function updateCartNumber() {
  const navCartNumber = document.querySelector(".nav-cart-number");
  const cart = getCartFromLocalStorage();
  const totalItems = cart.length;
  navCartNumber.textContent = totalItems.toString();
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("userData");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  updateHeader();
}

function updateHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const optionUserBtn = document.querySelector(".option-user-btn");

  if (user) {
    optionUserBtn.innerHTML = `
    <span class="username">Xin chào, ${user.username}</span>
    <span class="info-btn">Thông tin</span>
    <span class="logout-btn">Đăng Xuất</span>
    `;

    const in4User = optionUserBtn.querySelector(".info-btn");
    in4User.addEventListener("click", () => {
      window.location.href = "user.html";
    });
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
