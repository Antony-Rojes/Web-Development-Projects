document.addEventListener("DOMContentLoaded", () => {
  const navBar = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-link");
  const burger = document.querySelector(".toggle");
  const menu = document.querySelector(".menu");
  const updateNavbar = () => {
    navBar.classList.toggle("scrolled", window.scrollY > 50);
  };
  const toggleMenu = () => {
    menu.classList.toggle("active");
    burger.classList.toggle("active");
  };
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (menu.classList.contains("active")) toggleMenu();
    });
  });
  burger.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", updateNavbar);
});
