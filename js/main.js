/* 
   DARK / LIGHT MODE
   */
const themeToggle = document.getElementById("theme-toggle");

// Au chargement de la page, on vérifie si un thème a été sauvegardé
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
} else {
  themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}
/* 
   NAVBAR DYNAMIQUE AU SCROLL
*/
const navbar = document.querySelector(".navbar");

function handleNavbarScroll() {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbarScroll);
handleNavbarScroll();

/* 
   MENU HAMBURGER MOBILE
   */
const hamburger = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// Au clic sur le bouton, on bascule le thème
themeToggle.addEventListener("click", () => {

  if (document.body.classList.contains("light")) {
    // Le site est actuellement clair → on repasse en sombre
    document.body.classList.remove("light");
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    localStorage.setItem("theme", "dark");

  } else {
    // Le site est actuellement sombre → on passe en clair
    document.body.classList.add("light");
    themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    localStorage.setItem("theme", "light");
  }

});

/* 
   COMPTE À REBOURS 
   */
const targetDate = new Date("2026-11-14T09:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* 
   COMPTEURS ANIMÉS (chiffres clés)
  */
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  let current = 0;
  const step = Math.ceil(target / 60);

  const counterInterval = setInterval(() => {
    current += step;

    if (current >= target) {
      element.textContent = target;
      clearInterval(counterInterval);
    } else {
      element.textContent = current;
    }
  }, 25);
}

/* 
   ANIMATIONS AU SCROLL (IntersectionObserver)
    */
const animatedElements = document.querySelectorAll(".anim");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      // Si l'élément visible est une carte de statistique, on lance son compteur
      if (entry.target.classList.contains("stat-item")) {
        const number = entry.target.querySelector(".stat-number");
        animateCounter(number);
      }

      // On arrête de surveiller cet élément une fois l'animation lancée
      observer.unobserve(entry.target);
    }

  });

}, { threshold: 0.3 });

animatedElements.forEach((element) => {
  observer.observe(element);
});

/*
   ONGLETS DU PROGRAMME 
   */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-tab");

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

/*
   FILTRAGE DES INTERVENANTS 
    */
const filterButtons = document.querySelectorAll(".filter-btn");
const speakerCards = document.querySelectorAll(".speaker-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    speakerCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (filterValue === "all" || cardCategory === filterValue) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

/* 
   VALIDATION DU FORMULAIRE 
    */
const form = document.getElementById("registration-form");
const successMessage = document.getElementById("form-success");

if (form && successMessage) {

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;

    // Nom complet
    const fullname = document.getElementById("fullname");
    if (fullname.value.trim().length < 3) {
      showError(fullname);
      isFormValid = false;
    } else {
      showValid(fullname);
    }

    // Email 
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email);
      isFormValid = false;
    } else {
      showValid(email);
    }

    // Téléphone
    const phone = document.getElementById("phone");
    const phoneDigits = phone.value.replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      showError(phone);
      isFormValid = false;
    } else {
      showValid(phone);
    }

    //  Type de participation
    const participation = document.getElementById("participation");
    if (participation.value === "") {
      showError(participation);
      isFormValid = false;
    } else {
      showValid(participation);
    }

    // Pays
    const country = document.getElementById("country");
    if (country.value === "") {
      showError(country);
      isFormValid = false;
    } else {
      showValid(country);
    }

    //Message
    const message = document.getElementById("message");
    if (message.value.trim().length < 20) {
      showError(message);
      isFormValid = false;
    } else {
      showValid(message);
    }

    //Résultat final
    if (isFormValid) {
      successMessage.classList.add("visible");
      successMessage.textContent = "Votre inscription a bien été envoyée !";
      form.reset();

      // On retire aussi les bordures vertes après la réinitialisation
      form.querySelectorAll("input, select, textarea").forEach((field) => {
        field.classList.remove("valid");
      });

    } else {
      successMessage.classList.remove("visible");
    }
  });

}

function showError(field) {
  field.classList.add("invalid");
  field.classList.remove("valid");
  field.nextElementSibling.classList.add("visible");
}

function showValid(field) {
  field.classList.remove("invalid");
  field.classList.add("valid");
  field.nextElementSibling.classList.remove("visible");
}
/*    
   BOUTON RETOUR EN HAUT
     */
const backToTop = document.getElementById("back-to-top");

function handleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleBackToTop);
handleBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
/*  
   ANNÉE DYNAMIQUE DANS LE FOOTER
   */
const yearEl = document.getElementById("current-year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}