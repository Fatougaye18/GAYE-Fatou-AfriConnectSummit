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