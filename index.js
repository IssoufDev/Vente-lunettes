// ===== Menu mobile =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const menuIcon = menuToggle.querySelector('i');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  menuIcon.classList.toggle('fa-bars', !open);
  menuIcon.classList.toggle('fa-xmark', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  menuIcon.classList.add('fa-bars');
  menuIcon.classList.remove('fa-xmark');
}));

// ===== Slider Principal (Hero) =====
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = 0;
let autoplay;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Aller à la slide ' + (i + 1));
  dot.setAttribute('aria-controls', 'slider');
  dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('.dot');

function goTo(i) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (i + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  dots.forEach((dot, index) => dot.setAttribute('aria-current', index === current ? 'true' : 'false'));
  resetAutoplay();
}
function startAutoplay() {
  if (!prefersReducedMotion) autoplay = setInterval(() => goTo(current + 1), 4000);
}
function resetAutoplay() { clearInterval(autoplay); startAutoplay(); }
startAutoplay();

// ===== Reveal au scroll =====
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('reveal-visible'));
}

// ===== Commander -> WhatsApp =====
function orderProduct(name) {
  const msg = encodeURIComponent("Bonjour, je veux commander le modèle " + name);
  window.open("https://wa.me/22367498538?text=" + msg, "_blank");
}

// ===== Diaporama automatique à l'intérieur de CHAQUE carte =====
function startCardsAutoplay() {
  if (prefersReducedMotion) return;
  const cardSliders = document.querySelectorAll('.card-slider');

  cardSliders.forEach(slider => {
    const cardSlides = slider.querySelectorAll('img');
    let cardCurrent = 0;

    setInterval(() => {
      cardSlides[cardCurrent].classList.remove('active');
      cardCurrent = (cardCurrent + 1) % cardSlides.length;
      cardSlides[cardCurrent].classList.add('active');
    }, 4000);
  });
}

// Lancement global du diaporama des cartes au chargement
startCardsAutoplay();

//   FLECHE
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// clic → scroll smooth
scrollBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});