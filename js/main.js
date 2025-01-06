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
// Exemple d'utilisation de Chart.js pour les stats générales
const statsCtx = document.getElementById('statsChart').getContext('2d');
new Chart(statsCtx, {
    type: 'line',
    data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
            label: 'Trafic des utilisateurs',
            data: [10, 20, 15, 30, 25, 40, 50],
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.2)'
        }]
    }
});



// Fonction pour charger les articles depuis un fichier JSON
async function loadArticles() {
    try {
        // Récupère les données depuis le fichier JSON
        const response = await fetch('assets/data/articles.json');
        
        // Vérifie que la réponse est correcte
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement : ${response.status}`);
        }

        // Convertit la réponse en JSON
        const data = await response.json();

        // Appelle la fonction pour afficher les articles
        renderArticles(data.articles);
    } catch (error) {
        console.error('Erreur :', error);
        alert('Impossible de charger les articles.');
    }
}

// Fonction pour afficher les articles
function renderArticles(articles) {
    const articlesTable = document.getElementById('articlesTable');
    articlesTable.innerHTML = '';

    articles.forEach(article => {
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-100');
        row.innerHTML = `
            <td class="border px-4 py-2">${article.id}</td>
            <td class="border px-4 py-2">${article.name}</td>
            <td class="border px-4 py-2">${article.category}</td>
            <td class="border px-4 py-2">${article.price}</td>
            <td class="border px-4 py-2">${article.stock}</td>
            <td class="border px-4 py-2">
                <button class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" onclick="editArticle(${article.id})">Modifier</button>
                <button class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onclick="deleteArticle(${article.id})">Supprimer</button>
            </td>
        `;
        articlesTable.appendChild(row);
    });
}

// Fonction pour modifier un article (exemple simple)
function editArticle(id) {
    alert(`Modifier l'article avec ID : ${id}`);
}

// Fonction pour supprimer un article
function deleteArticle(id) {
    alert(`Supprimer l'article avec ID : ${id}`);
}

// Charge les articles quand la page est prête
loadArticles();
