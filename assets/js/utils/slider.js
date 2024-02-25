// utils/slider.js
const sliderBtns = document.querySelectorAll(".slider-btn");
const sliderImgs = document.querySelectorAll(".slider-img");
let currentSlide = 0;

function startSlider() {
  setInterval(() => {
    currentSlide++;
    if (currentSlide > sliderImgs.length - 1) {
      currentSlide = 0;
    }
    sliderBtns[currentSlide].checked = true;
  }, 5000);
}

export { startSlider };
