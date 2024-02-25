// user.js
import { SuccessMessage } from "./utils/utilsAdmin.js";
import { fetchData, postData } from "./api/getData.js";

function closeForm(formId) {
  document.getElementById(formId).style.display = "none";
}

async function registerUser() {
  document
    .getElementById("register-btn")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const role = document.getElementById("role").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("passRegister").value;
      const confirmPassword = document.querySelector(
        '.inputForm-text input[placeholder="Nhập lại mật khẩu"]'
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

        const highestId = users.reduce((maxId, users) => Math.max(maxId, parseInt(users.id) || 0), 0);

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

function loginUser() {
  document
    .getElementById("login-form-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const email = document.getElementById("emailLogin").value;
      const password = document.getElementById("passLogin").value;

      fetchData(
        `http://localhost:3000/users?email=${email}&password=${password}`
      )
        .then((data) => {
          console.log(data[0].role);
          if (data && data[0].role === "admin") {
            localStorage.setItem("user", JSON.stringify(data[0]));
            window.location.href = "../admin.html";
          } else {
            localStorage.setItem("user", JSON.stringify(data[0]));
            SuccessMessage("Đăng nhập thành công!");
            closeForm("loginForm");
            setTimeout(() => {
              window.location.href = "../index.html";
            }, 3000);
          }
        })

        .catch((error) => {
          console.error("Lỗi khi đăng nhập:", error);
          SuccessMessage(
            "Đăng nhập không thành công, kiểm tra lại thông tin !!"
          );
        });
    });
}

function openForm(formId) {
  var loginForm = document.getElementById("loginForm");
  var registerForm = document.getElementById("registerForm");
  if (formId === "loginForm") {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
  } else if (formId === "registerForm") {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  }
}

export { registerUser, loginUser };
