// user.js
import { SuccessMessage } from "./utils/utilsAdmin.js";
import { fetchData, postData } from "./api/getData.js";
import { jwtDecode } from "../../node_modules/jwt-decode/build/esm/index.js";
import { updateHeader } from "./utils/updateHeader.js";
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

        const highestId = users.reduce(
          (maxId, user) => Math.max(maxId, parseInt(user.id) || 0),
          0
        );

        const userID = (highestId + 1).toString();

        await postData("http://localhost:3000/users/register", {
          id: userID,
          username: username,
          email: email,
          password: password,
          role: role,
          status: "Active",
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

async function loginUser() {
  const ClientID =
    "180086349531-p8s9421cv35ki1m24pbu8pohm9d0po2p.apps.googleusercontent.com";
  const LINK_GET_TOKEN = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=http://127.0.0.1:5500/index.html&client_id=${ClientID}`;
  const signBtn = document.getElementById("loginGG");
  signBtn.addEventListener("click", () => {
    window.location.href = LINK_GET_TOKEN;
  });

  const isGoogleLogin = window.location.href.includes('access_token');
  if (isGoogleLogin) {
    const accessToken = getToken();
    if (accessToken) {
      await getUserGG(accessToken);
    }
  }

  document
    .getElementById("login-form-btn")
    .addEventListener("click", async function (event) {
      event.preventDefault();

      const email = document.getElementById("emailLogin").value;
      const password = document.getElementById("passLogin").value;

      try {
        const response = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi đăng nhập.");
        }

        const data = await response.json();

        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        const decodedToken = jwtDecode(data.accessToken);
        localStorage.setItem("user", JSON.stringify(decodedToken));
        if (decodedToken.status !== "Active") {
          SuccessMessage("Tài khoản đã bị khóa");
          return;
        }

        if (decodedToken.role == "admin") {
          window.location.href = "../admin.html";
        } else {
          SuccessMessage("Đăng nhập thành công!");
          closeForm("loginForm");
          setTimeout(() => {
            window.location.href = "../index.html";
          }, 3000);
        }
      } catch (error) {
        if (error.message === "Tài khoản đã bị khóa.") {
          SuccessMessage(
            "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để biết thêm thông tin."
          );
        } else {
          SuccessMessage("Đăng nhập không thành công: " + error.message);
        }
      }
    });
}


function getToken() {
  const savedAccessToken = window.localStorage.getItem("accessToken");
  if (savedAccessToken) {
    return savedAccessToken;
  } else {
    const url = new URLSearchParams(window.location.hash.substring(1));
    const token = url.get("access_token");
    if (token) {
      window.localStorage.setItem("accessToken", token);
      return token;
    } else {
      return null;
    }
  }
}

async function getUserGG(accessToken) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );

    const dataUser = await response.json();
    const responseUser = await fetch("http://localhost:3000/users");
    const users = await responseUser.json();
    const highestId = users.reduce(
      (maxId, user) => Math.max(maxId, parseInt(user.id) || 0),
      0
    );
    const userID = (highestId + 1).toString();
    const userWithId = {
      id: userID,
      username: dataUser.name,
      email: dataUser.email,
      picture: dataUser.picture,
      role: "user",
      status: "Active",
    };

    const existingUser = users.find((user) => user.email === dataUser.email);

    if (existingUser) {
      localStorage.setItem("user", JSON.stringify(existingUser));
      updateHeader();
    } else {
      localStorage.setItem("user", JSON.stringify(userWithId));
      await postData("http://localhost:3000/users/register/gg", userWithId);
      updateHeader();
      SuccessMessage("Đăng nhập thành công!");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 100);
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng từ Google:", error);
  }
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



export { registerUser, loginUser  };
