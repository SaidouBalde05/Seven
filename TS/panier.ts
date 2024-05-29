interface Commande {
    nom: string;
    prix: number;
    quantite: number;
    image: string;
}

function initialiserLocalStorage(): void {
    const timestamp = localStorage.getItem("timestamp");

    if (timestamp) {
        const now = Date.now();
        const diff = now - parseInt(timestamp, 10);
        const oneDay = 60000;
       // const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

        if (diff > oneDay) {
            localStorage.clear();
            localStorage.setItem("timestamp", now.toString());
        }
    } else {
        localStorage.setItem("timestamp", Date.now().toString());
    }
}

function ajouterAuPanier(nom: string, prix: number, image: string): void {
    initialiserLocalStorage();
    
    const commande: Commande = {
        nom,
        prix,
        quantite: 1,
        image
    };

    let panier: Commande[] = JSON.parse(localStorage.getItem("panier") || "[]");
    panier.push(commande);
    localStorage.setItem("panier", JSON.stringify(panier));

    window.location.href = "panier.html";
}

function afficherPanier(): void {
    initialiserLocalStorage();
    
    let panier: Commande[] = JSON.parse(localStorage.getItem("panier") || "[]");
    const panierDiv = document.getElementById("panier");

    if (panierDiv) {
        if (panier.length === 0) {
            panierDiv.innerHTML = '<p class="text-3xl font-semibold">Votre panier est vide</p>';
        } else {
            panier.forEach(commande => {
                const commandeDiv = document.createElement("div");
                commandeDiv.className = "w-full flex items-center p-4 bg-white shadow-md rounded-lg";
                commandeDiv.innerHTML = `
                    <img src="${commande.image}" alt="${commande.nom}" class="w-20 h-20 object-cover rounded mr-4">
                    <div>
                        <p class="text-xl font-semibold">${commande.nom}</p>
                        <p>${commande.prix}€ - Quantité: ${commande.quantite}</p>
                    </div>
                `;
                panierDiv.appendChild(commandeDiv);
            });
        }
    }
}

window.onload = () => {
    const buttons = document.querySelectorAll(".commander-btn");
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const produitDiv = (event.target as HTMLElement).closest(".produit");
            if (produitDiv) {
                const nom = produitDiv.getAttribute("data-nom")!;
                const prix = parseFloat(produitDiv.getAttribute("data-prix")!);
                const image = produitDiv.getAttribute("data-image")!;
                ajouterAuPanier(nom, prix, image);
            }
        });
    });

    if (document.getElementById("panier")) {
        afficherPanier();
    }
};
