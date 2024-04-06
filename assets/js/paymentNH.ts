import { updateHeader, updateCartNumber } from "./utils/updateHeader.js";
import { formatPrice } from "./utils/formatPrice.js";
import { addOrder } from "./api/api.js";
import { SuccessMessage } from "./utils/utilsAdmin.js";
declare global {
    interface Window {
      isPaymentSuccessful: boolean;
    }
  }
document.addEventListener("DOMContentLoaded", function () {
  updateHeader();
  updateCartNumber();

  const bankInfo = {
    bankId: "MB",
    accountNo: "4922042004",
  };

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const totalAmount = cart.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
);


  const paidAmountElement = document.getElementById("paid-amout");
  const paidContentElement = document.getElementById("paid-nd");
  const userInfo = `${user.username}${user.id}`;
  const productsInfo = cart.map((item: any) => item.id).join("");
  const paidContent = `${userInfo}${productsInfo}`;

  
  if (paidAmountElement) {
    paidAmountElement.textContent = formatPrice(totalAmount);
  }
  
  if (paidContentElement) {
    paidContentElement.textContent = paidContent;
  }
  startCountdown();
  generateQRCode(bankInfo, totalAmount, paidContent, user);
  startPaymentCheck(totalAmount, paidContent);
});

function startCountdown() {
  const endTime = Date.now() + 4 * 60 * 1000;
  const countdownInterval = setInterval(() => {
    const timeLeft = endTime - Date.now();
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      handlePaymentTimeout();
      return;
    }
    updateCountdownDisplay(timeLeft);
  }, 1000);
}

function updateCountdownDisplay(timeLeft: number): void {
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.textContent = `Thanh toán trong: ${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }
}

function handlePaymentTimeout() {
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    countdownElement.textContent = "Đã hết thời gian thanh toán";
  }
  SuccessMessage("Đã hết thời gian thanh toán vui lòng trở lại trang chủ!!!!");

  const orderButton = document.querySelector(".button-cta") as HTMLElement | null;
  if (orderButton) {
    orderButton.style.display = "none";
  
    const returnHomeButton = document.createElement("button");
    returnHomeButton.textContent = "Trở về trang chủ";
    returnHomeButton.className = "button-cta";
    returnHomeButton.addEventListener(
      "click",
      () => (window.location.href = "index.html")
    );
  
    const appPayDiv = document.getElementById("app-pay");
    if (appPayDiv) {
      appPayDiv.appendChild(returnHomeButton);
    }
  }
}

function generateQRCode(bankInfo: any, totalAmount: number, paidContent: string, user: any) {
  const qrCodeImg = document.querySelector(".qr-code") as HTMLImageElement;
  if (qrCodeImg) {
    qrCodeImg.src = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNo}-compact.png?amount=${totalAmount}&addInfo=${paidContent}&accountName=${user.id}`;
  }
}

function startPaymentCheck(totalAmount: number, paidContent: string) {
  setTimeout(() => {
    const checkPaidInterval = setInterval(() => {
      checkPaid(totalAmount, paidContent, checkPaidInterval);
      console.log("check không thanh toán thành công");
    }, 1000);
  }, 5000);
}

async function checkPaid(price: number, content: string, intervalId: NodeJS.Timeout) {
  if (window.isPaymentSuccessful) {
    clearInterval(intervalId);
    return;
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby_-ISEEGAH5dMc6tzPglQSyG5VUoFGuEeb-F_PRqigp_Ihkpvhw8XKTzjDVUk5PYrZvg/exec"
    );
    const data = await response.json();
    const lastPaid = data.data[data.data.length - 1];
    const lastPrice = lastPaid["Giá trị"];
    const lastContent = lastPaid["Mô tả"];
    if (lastPrice >= price && lastContent.includes(content)) {
      SuccessMessage("thanh toán thành công");
      window.isPaymentSuccessful = true;
      clearInterval(intervalId);
      const userData = JSON.parse(localStorage.getItem("userData")|| "{}");
      addOrder(userData);
      localStorage.removeItem("userData");
      localStorage.removeItem("cart");
      setTimeout(() => (window.location.href = "index.html"), 3000);
    }
  } catch (error) {
    console.error(error);
  }
}
