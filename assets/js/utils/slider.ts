const sliderBtns: NodeListOf<HTMLInputElement> = document.querySelectorAll(".slider-btn");
const sliderImgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(".slider-img");
let currentSlide: number = 0;

function startSlider(): void {
  setInterval(() => {
    currentSlide++;
    if (currentSlide > sliderImgs.length - 1) {
      currentSlide = 0;
    }
    (sliderBtns[currentSlide] as HTMLInputElement).checked = true;
  }, 5000);
}

export { startSlider };
