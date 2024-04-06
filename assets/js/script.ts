const sliderBtns = document.querySelectorAll<HTMLInputElement>(".slider-btn");
const sliderImgs = document.querySelectorAll<HTMLImageElement>(".slider-img");
let currentSlide = 0;

const startSlider = () => {
  setInterval(() => {
    currentSlide++;
    if (currentSlide > sliderImgs.length - 1) {
      currentSlide = 0;
    }
    (sliderBtns[currentSlide] as HTMLInputElement).checked = true;
  }, 5000);
};

startSlider();

function showOptionForm() {
  const optionUser = document.querySelector<HTMLElement>(".option-user");
  if (optionUser) {
    optionUser.classList.toggle("active");
  }
}

function openForm(formId: string) {
  const loginForm = document.getElementById("loginForm") as HTMLElement;
  const registerForm = document.getElementById("registerForm") as HTMLElement;
  if (formId === "loginForm") {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
  } else if (formId === "registerForm") {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
  }
}

function closeForm() {
  const registerForm = document.getElementById("registerForm") as HTMLElement;
  const loginForm = document.getElementById("loginForm") as HTMLElement;
  if (registerForm && loginForm) {
    registerForm.style.display = "none";
    loginForm.style.display = "none";
  }
}
