"use strict";

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector("[data-preload]");
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Add EventListeren on multiple elements
const addEventOnElements = (elements, eventType, callback) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// Navbar
const navbar = document.querySelector("[data-navbar]");
const navbarToggler = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};
addEventOnElements(navbarToggler, "click", toggleNavbar);

// Header & Back to top
const header = document.querySelector("[data-header]");
const backtotop = document.querySelector("[data-back-top-btn]");
let lastScrollpos = 0;
const hideHeader = () => {
  const isScrollBottom = lastScrollpos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollpos = window.scrollY;
};
window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backtotop.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backtotop.classList.remove("active");
  }
});

// Hero Slider
const slider = document.querySelector("[data-hero-slider]");
const slide = document.querySelectorAll("[data-hero-slide]");
const buttonPrev = document.querySelector("[data-prev-btn]");
const buttonNext = document.querySelector("[data-next-btn]");

let sliderIndex = 0;
let lastActiveSlider = slide[0];

const currentSliderIndex = () => {
  lastActiveSlider.classList.remove("active");
  slide[sliderIndex].classList.add("active");
  lastActiveSlider = slide[sliderIndex];
};

const slideNext = () => {
  if (sliderIndex >= slide.length - 1) {
    sliderIndex = 0;
  } else {
    sliderIndex++;
  }
  currentSliderIndex();
};

const sliderPrev = () => {
  if (sliderIndex <= 0) {
    sliderIndex = slide.length - 1;
  } else {
    sliderIndex--;
  }
  currentSliderIndex();
};

buttonNext.addEventListener("click", slideNext);

buttonPrev.addEventListener("click", sliderPrev);

// auto slider

let autoSliderInterval;

const autoSlider = () => {
  autoSliderInterval = setInterval(() => {
    slideNext();
  }, 7000);
};

addEventOnElements([buttonNext, buttonPrev], "mouseover", () => {
  clearInterval(autoSlider);
});

addEventOnElements([buttonNext, buttonPrev], "mouseout", autoSlider);

window.addEventListener("load", autoSlider);

// Parallex Effects
const parallax = document.querySelectorAll("[data-parallax-item]");
window.addEventListener("mousemove", function (e) {
  let x = (e.clientX / window.innerWidth) * 10 - 5;
  let y = (e.clientY / window.innerHeight) * 10 - 5;
  x = -x;
  y = -y;
  for (let i = 0; i < parallax.length; i++) {
    let speed = Number(parallax[i].dataset.parallaxSpeed) || 1;
    let moveX = x * speed;
    let moveY = y * speed;
    parallax[i].style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  }
});

// Footer date
const date = new Date();
const current_year = document.getElementById("date");
current_year.innerHTML = date.getFullYear();
