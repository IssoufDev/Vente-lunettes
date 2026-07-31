 // ===== Menu mobile =====
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // ===== Slider Principal (Hero) =====
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots');
  let current = 0;
  let autoplay;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Aller à la slide ' + (i + 1));
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
    resetAutoplay();
  }
  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

  function startAutoplay() { autoplay = setInterval(() => goTo(current + 1), 3000); }
  function resetAutoplay() { clearInterval(autoplay); startAutoplay(); }
  startAutoplay();

  // ===== Slider Section Collection (3 par 3) =====
  const prodGrid = document.getElementById('productsGrid');
  const prevProdBtn = document.getElementById('prevProd');
  const nextProdBtn = document.getElementById('nextProd');
  let prodIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function updateProdSlider() {
    const card = prodGrid.querySelector('.card');
    if (!card) return;
    const cardWidth = card.getBoundingClientRect().width;
    const gap = 25; 
    prodGrid.style.transform = `translateX(-${prodIndex * (cardWidth + gap)}px)`;
  }

  nextProdBtn.addEventListener('click', () => {
    const totalCards = prodGrid.querySelectorAll('.card').length;
    const cardsPerView = getCardsPerView();
    if (prodIndex < totalCards - cardsPerView) {
      prodIndex++;
    } else {
      prodIndex = 0; 
    }
    updateProdSlider();
  });

  prevProdBtn.addEventListener('click', () => {
    const totalCards = prodGrid.querySelectorAll('.card').length;
    const cardsPerView = getCardsPerView();
    if (prodIndex > 0) {
      prodIndex--;
    } else {
      prodIndex = totalCards - cardsPerView; 
    }
    updateProdSlider();
  });

  window.addEventListener('resize', () => {
    prodIndex = 0;
    updateProdSlider();
  });

  // ===== Reveal au scroll =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ===== Commander -> WhatsApp =====
  function orderProduct(name) {
    const msg = encodeURIComponent("Bonjour, je veux commander le modèle " + name);
    window.open("https://wa.me/22367498538?text=" + msg, "_blank");
  }

  // ===== Diaporama automatique à l'intérieur de CHAQUE carte =====
  function startCardsAutoplay() {
    const cardSliders = document.querySelectorAll('.card-slider');
    
    cardSliders.forEach(slider => {
      const cardSlides = slider.querySelectorAll('img');
      let cardCurrent = 0;

      setInterval(() => {
        cardSlides[cardCurrent].classList.remove('active');
        cardCurrent = (cardCurrent + 1) % cardSlides.length;
        cardSlides[cardCurrent].classList.add('active');
      }, 3000); // Changement d'image toutes les 2 secondes (2000ms)
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