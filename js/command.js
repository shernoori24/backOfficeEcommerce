
// Fonction pour charger les Commandes depuis un fichier JSON
async function loadCommandes() {
    try {
        // Récupère les données depuis le fichier JSON
        const response = await fetch('assets/data/data.json');
        
        // Vérifie que la réponse est correcte
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement : ${response.status}`);
        }

        // Convertit la réponse en JSON
        const data = await response.json();

        // Appelle la fonction pour afficher les Commandes
        renderCommandes(data.orders);
    } catch (error) {
        console.error('Erreur :', error);
        alert('Impossible de charger les Commandes.');
    }
}

// Fonction pour afficher les Commandes
function renderCommandes(Commandes) {
    const CommandesTable = document.getElementById('commandesTable');
    CommandesTable.innerHTML = '';

    Commandes.forEach(commande => {
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-100');


        const itemsHTML = commande.items.map(item => `
            <div>
                Article ID: ${item.articleId}, Quantité: ${item.quantity}
            </div>
        `).join('');

        row.innerHTML = `
            <td class="border px-4 py-2">${commande.id}</td>
            <td class="border px-4 py-2">${commande.user}</td>
            <td class="border px-4 py-2">${commande.status}</td>
            <td class="border px-4 py-2">${commande.totalPrice}</td>
            <td class="border px-4 py-2">

             ${itemsHTML}
            
            
            
            
            </td>
            <td class="border px-4 py-2">
                <button class="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600" onclick="editcommande(${commande.id})">Accepter</button>
                <button class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" onclick="deletecommande(${commande.id})">Refuser</button>
            </td>
        `;
        CommandesTable.appendChild(row);
    });
}

// Fonction pour Accepter un commande (exemple simple)
function editcommande(id) {
    alert(`Accepter l'commande avec ID : ${id}`);
}

// Fonction pour Refuser un commande
function deletecommande(id) {
    alert(`Refuser l'commande avec ID : ${id}`);
}

// Charge les Commandes quand la page est prête
loadCommandes();
