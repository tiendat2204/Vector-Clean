const sliderBtns = document.querySelectorAll(".slider-btn");
const sliderImgs = document.querySelectorAll(".slider-img");
let currentSlide = 0;
let sliderInterval;
// Function to start the slider
const startSlider = () => {
    sliderInterval = setInterval(() => {
        showNextSlide();
    }, 5000);
};

// Function to show the next slide
const showNextSlide = () => {
    currentSlide = (currentSlide + 1) % sliderImgs.length;
    updateSlider();
};

// Function to update the slider
const updateSlider = () => {
    sliderBtns.forEach((btn, index) => {
        btn.checked = index === currentSlide;
    });
};

// Event listener for slider buttons
sliderBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentSlide = index;
        clearInterval(sliderInterval);
        updateSlider();
        startSlider();
    });
});

// Function to toggle option form
function showOptionForm() {
    const optionUser = document.querySelector(".option-user");
    if (optionUser) {
        optionUser.classList.toggle("active");
    }
}

// Function to open login or register form
function openForm(formId) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    if (formId === "loginForm") {
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
    } else if (formId === "registerForm") {
        loginForm.style.display = "none";
        registerForm.style.display = "flex";
    }
}

// Function to close all forms
function closeForm() {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const forgotForm = document.getElementById("forgot-pass-form");
    if (registerForm && loginForm && forgotForm) {
        registerForm.style.display = "none";
        loginForm.style.display = "none";
        forgotForm.style.display = "none";
    }
}

// Function to open forgot password form
function openFormForgot() {
    
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const forgotForm = document.getElementById("forgot-pass-form");
    if (forgotForm) {
        forgotForm.style.display = "flex";
        registerForm.style.display = "none";
        loginForm.style.display = "none";
    }
}

// Start the slider when the page loads
startSlider();

