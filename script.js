const menuButton = document.querySelector(".menu");
const navigationLinks = document.querySelector(".links");

if (menuButton && navigationLinks) {
  const setMenuOpen = (isOpen) => {
    navigationLinks.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.textContent = isOpen ? "×" : "☰";
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navigationLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      setMenuOpen(false);
    }
  });
}

const topButton = document.querySelector(".top");

if (topButton) {
  const updateTopButton = () => {
    topButton.classList.toggle("show", window.scrollY > 450);
  };

  window.addEventListener("scroll", updateTopButton, { passive: true });
  updateTopButton();

  topButton.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}