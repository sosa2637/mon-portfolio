// ==============================
// ANNÉE AUTOMATIQUE FOOTER
// ==============================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ==============================
// LIGHTBOX GALLERY PRO (UI / DESIGN)
// ==============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const btnClose = document.querySelector(".lightbox-close");
const btnPrev = document.querySelector(".lightbox-prev");
const btnNext = document.querySelector(".lightbox-next");

let gallery = [];
let currentIndex = 0;

// Sécurité si la lightbox n’existe pas sur la page
if (lightbox && lightboxImg && btnClose && btnPrev && btnNext) {

  document.querySelectorAll(".lightbox-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const group = link.dataset.gallery;
      if (!group) return;

      gallery = Array.from(
        document.querySelectorAll(`[data-gallery="${group}"]`)
      ).map(a => a.getAttribute("href"));

      currentIndex = gallery.indexOf(link.getAttribute("href"));
      openLightbox();
    });
  });

  function openLightbox() {
    lightbox.classList.add("active");
    lightboxImg.src = gallery[currentIndex];
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  btnClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  btnPrev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    lightboxImg.src = gallery[currentIndex];
  });

  btnNext.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % gallery.length;
    lightboxImg.src = gallery[currentIndex];
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") btnPrev.click();
    if (e.key === "ArrowRight") btnNext.click();
  });
}

// ==============================
// PRÉCHARGEMENT DES IMAGES UI
// ==============================
(function preloadLightboxImages() {
  const links = document.querySelectorAll(".lightbox-link");
  if (!links.length) return;

  const cache = new Set();

  links.forEach(link => {
    const src = link.getAttribute("href");
    if (!src || cache.has(src)) return;

    const img = new Image();
    img.src = src;
    cache.add(src);
  });
})();

// ==============================
// MENU HAMBURGER FULLSCREEN
// ==============================
(function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".nav-overlay");

  if (!hamburger || !nav) return;

  function openMenu() {
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    nav.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    nav.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  function toggleMenu() {
    nav.classList.contains("active") ? closeMenu() : openMenu();
  }

  // Clic hamburger
  hamburger.addEventListener("click", e => {
    e.stopPropagation();
    toggleMenu();
  });

  // Clic overlay
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // Échap
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  // Click hors header
  document.addEventListener("click", e => {
    const header = document.querySelector(".site-header");
    if (header && !header.contains(e.target)) {
      closeMenu();
    }
  });

  // ⚠️ IMPORTANT
  // On NE bloque PAS les clics sur les liens
  // Le navigateur gère la navigation naturellement
})();
