const sliderBtns = document.querySelectorAll(".slider-btn");
const sliderImgs = document.querySelectorAll(".slider-img");
let currentSlide = 0;
const startSlider = () => {
  setInterval(() => {
    currentSlide++;
    if (currentSlide > sliderImgs.length - 1) {
      currentSlide = 0;
    }
    sliderBtns[currentSlide].checked = true;
  }, 5000);
};
startSlider();

function showOptionForm() {
  var optionUser = document.querySelector(".option-user");
  optionUser.classList.toggle("active");
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

function closeForm() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "none";
}
