const themeToggle = document.getElementById("theme-toggle");

// Au chargement de la page, on vérifie si un thème a été sauvegardé
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
} else {
  themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

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
// Date fictive de la conférence
const targetDate = new Date("2026-11-14T09:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

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
const statNumbers = document.querySelectorAll(".stat-number");

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