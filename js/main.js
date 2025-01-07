document.addEventListener("DOMContentLoaded", () => {
    // Récupérer tous les liens du menu
    const menuLinks = document.querySelectorAll("nav a");

    // Récupérer toutes les sections
    const sections = document.querySelectorAll(".content-section");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Récupérer la section correspondante
            const targetSectionId = link.getAttribute("data-section");
            const targetSection = document.getElementById(targetSectionId);

            // Masquer toutes les sections
            sections.forEach(section => section.classList.remove("active"));

            // Afficher la section cible
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // Afficher la section par défaut
    document.getElementById("stats").classList.add("active");
});