let toggle = document.querySelector(".toggle");
let body = document.querySelector("body");
let circle_dark = document.querySelector(".circle_dark");
let circle_light = document.querySelector(".circle_loght");
let navbar = document.querySelector(".navbar");
let mobNav = document.querySelector(".mob_navbar");
let mobNavBtn = document.querySelector(".check");

// toggle.addEventListener("click", () => {
//     body.classList.toggle("dark");
// });

window.addEventListener("scroll", () => {
    console.log("scrolled");
    navbar.classList.toggle("navbar_scroll", window.scrollY > 0);
});

mobNavBtn.addEventListener("click", () => {
    mobNav.classList.toggle("mob_navbar_none");
});