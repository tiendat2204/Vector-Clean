import { getCartFromLocalStorage } from "./cartUtils";

function updateCartNumber(): void {
  const navCartNumber: HTMLElement | null = document.querySelector(".nav-cart-number");
  const cart: any[] = getCartFromLocalStorage();
  const totalItems: number = cart.length;
  if (navCartNumber) {
    navCartNumber.textContent = totalItems.toString();
  }
}

function logout(): void {
  localStorage.removeItem("user");
  updateHeader();
}

function updateHeader(): void {
  const user: any = JSON.parse(localStorage.getItem("user") || "");
  const optionUserBtn: HTMLElement | null = document.querySelector(".option-user-btn");

  if (optionUserBtn) {
    if (user) {
      optionUserBtn.innerHTML = `
        <span class="username">Xin chào, ${user.username}</span>
        <span class="logout-btn">Đăng Xuất</span>
      `;

      const logoutButton: HTMLElement | null = optionUserBtn.querySelector(".logout-btn");
      if (logoutButton) {
        logoutButton.addEventListener("click", logout);
      }
    } else {
      optionUserBtn.innerHTML = `
        <a href="#" onclick="openForm('loginForm')"> <span class="login-btn">Đăng Nhập</span></a>
        <a href="#" onclick="openForm('registerForm')">  <span class="register-btn">Đăng Kí</span></a>
      `;
    }
  }
}

export { updateCartNumber, updateHeader, logout };
