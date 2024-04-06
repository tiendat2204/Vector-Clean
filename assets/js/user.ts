import { SuccessMessage } from "./utils/utilsAdmin.js";
import { fetchData, postData } from "./api/getData.js";

function closeForm(formId: string): void {
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = "none";
  }
}

async function registerUser(): Promise<void> {
  document
    .getElementById("register-btn")
    ?.addEventListener("click", async function (event) {
      event.preventDefault();

      const username = (document.getElementById("username") as HTMLInputElement).value;
      const role = (document.getElementById("role") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("passRegister") as HTMLInputElement).value;
      const confirmPassword = (
        document.querySelector('.inputForm-text input[placeholder="Nhập lại mật khẩu"]') as HTMLInputElement
      ).value;

      if (!username || !role || !email || !password || !confirmPassword) {
        SuccessMessage("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        SuccessMessage("Địa chỉ email không hợp lệ.");
        return;
      }
      if (password !== confirmPassword) {
        SuccessMessage("Mật khẩu và mật khẩu xác nhận không trùng khớp.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        const highestId = users.reduce(
          (maxId: number, user: { id: string }) => Math.max(maxId, parseInt(user.id) || 0),
          0
        );

        const userID = (highestId + 1).toString();

        await postData("http://localhost:3000/users", {
          id: userID,
          username: username,
          email: email,
          password: password,
          role: role,
        });

        closeForm("registerForm");
        SuccessMessage("Đăng ký thành công!");
        openForm("loginForm");
      } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        SuccessMessage(
          "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin và thử lại."
        );
      }
    });
}

function loginUser(): void {
  document.getElementById("login-form-btn")?.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = (document.getElementById("emailLogin") as HTMLInputElement).value;
    const password = (document.getElementById("passLogin") as HTMLInputElement).value;

    try {
      const data = await fetchData(`http://localhost:3000/users?email=${email}&password=${password}`);

      if (!data || data.length === 0) {
        throw new Error("Tài khoản không tồn tại.");
      }

      const loggedInUser = data.find((user: any) => user.email === email);

      if (!loggedInUser) {
        throw new Error("Tài khoản không tồn tại.");
      }

      localStorage.setItem("user", JSON.stringify(loggedInUser));

      if (loggedInUser.role === "admin") {
        window.location.href = "../admin.html";
      } else {
        SuccessMessage("Đăng nhập thành công!");
        closeForm("loginForm");
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 3000);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      SuccessMessage("Đăng nhập không thành công, kiểm tra lại thông tin !!");
    }
  });
}

function openForm(formId: string): void {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    if (formId === "loginForm") {
      if (loginForm) {
        loginForm.style.display = "flex";
      }
      if (registerForm) {
        registerForm.style.display = "none";
      }
    } else if (formId === "registerForm") {
      if (loginForm) {
        loginForm.style.display = "none";
      }
      if (registerForm) {
        registerForm.style.display = "flex";
      }
    }
  }
  

export { registerUser, loginUser };
