"use strict";

// Preloader

window.addEventListener("load", () => {
  const preloader = document.querySelector("[data-preload]");
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});
