import { SuccessMessage } from "./utils/utilsAdmin.js";

async function sendResetRequest() {
  try {
    const btnSendMail = document.getElementById("btn-send-mail");
    btnSendMail.addEventListener("click", async function () {
      const email = document.getElementById("email-reset-pass").value;

      const body = JSON.stringify({ email });

      const response = await fetch(
        "http://127.0.0.1:3000/users/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      if (response.ok) {
        SuccessMessage("vui lòng kiểm tra hộp thoại email!!");
      } else {
        console.error(
          "Error sending reset password request:",
          response.status,
          response.statusText
        );
      }
    });
  } catch (error) {
    console.error("Error sending reset password request:", error);
  }
}


async function changePass(newPassword, resetToken) {
    try {
      const body = JSON.stringify({ newPassword, resetToken });
  
      const response = await fetch("http://127.0.0.1:3000/users/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
  
      if (response.ok) {
        SuccessMessage("Mật khẩu đã được thay đổi thành công!");
        closeForm("loginForm");
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 3000);
      } else if (response.status === 401) {
        const data = await response.json();
        SuccessMessage(data.message);
      } else {
        console.error(
          "Lỗi khi gửi yêu cầu thay đổi mật khẩu:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu thay đổi mật khẩu:", error);
    }
}

  function setupChangePasswordListener() {
    const btnConfirm = document.getElementById("change-pass");
    
    if (btnConfirm) {
      btnConfirm.addEventListener("click", async function () {
        const newPassword = document.getElementById("password-forgot").value;
        const newPasswordConfirm = document.getElementById("password-forgot2").value;
        const resetToken = getResetTokenFromURL();
      
        if (newPassword !== newPasswordConfirm) {
          SuccessMessage("Mật khẩu mới và xác nhận mật khẩu mới không khớp nhau!");
          return;
        }
      
        await changePass(newPassword, resetToken);
      });
    } 
  }
  
  function getResetTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    return token;
  }
  setupChangePasswordListener();
  sendResetRequest();