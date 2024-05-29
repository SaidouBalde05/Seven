interface Commande {
    nom: string;
    prix: number;
    quantite: number;
    image: string;
    livraison?: Livraison;
}

interface Livraison {
    telephone: string;
    lieu: string;
}

function initialiserLocalStorage(): void {
    const timestamp = localStorage.getItem("timestamp");

    if (timestamp) {
        const now = Date.now();
        const diff = now - parseInt(timestamp, 10);
        const oneDay = 240000;
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
            panierDiv.innerHTML = '<p class="text-xl font-semibold">Votre panier est vide vous n\'avez pas encore passer de commande.<br>Merci</p>';
        } else {
            panierDiv.innerHTML = ''; // Clear existing content
            panier.forEach((commande, index) => {
                const commandeDiv = document.createElement("div");
                commandeDiv.className = "w-full flex flex-col p-4 bg-white shadow-md rounded-lg mb-4";
                commandeDiv.innerHTML = `
                    <div class="flex items-center mb-4">
                        <img src="${commande.image}" alt="${commande.nom}" class="w-20 h-20 object-cover rounded mr-4">
                        <div>
                            <p class="text-xl font-semibold">${commande.nom}</p>
                            <p>${commande.prix}GNF - Quantité: 
                                <button class="bg-gray-300 text-black px-2 rounded" onclick="changerQuantite(${index}, -1)">-</button>
                                ${commande.quantite}
                                <button class="bg-gray-300 text-black px-2 rounded" onclick="changerQuantite(${index}, 1)">+</button>
                            </p>
                        </div>
                    </div>
                    <form class="livraison-form" data-index="${index}">
                        <h3 class="text-lg font-semibold mb-2">Informations de Livraison</h3>
                        <div class="mb-2">
                            <label for="telephone-${index}" class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                            <input type="text" id="telephone-${index}" name="telephone" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required value="${commande.livraison ? commande.livraison.telephone : ''}">
                        </div>
                        <div class="mb-2">
                            <label for="lieu-${index}" class="block text-sm font-medium text-gray-700">Lieu de livraison</label>
                            <input type="text" id="lieu-${index}" name="lieu" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required value="${commande.livraison ? commande.livraison.lieu : ''}">
                        </div>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">Confirmer la livraison</button>
                    </form>
                    ${commande.livraison ? `
                    <div class="mt-4">
                        <h4 class="text-md font-semibold">Informations de livraison enregistrées :</h4>
                        <p>Numéro de téléphone : ${commande.livraison.telephone}</p>
                        <p>Lieu de livraison : ${commande.livraison.lieu}</p>
                    </div>
                    ` : ''}
                `;
                panierDiv.appendChild(commandeDiv);
            });

            document.querySelectorAll('.livraison-form').forEach(form => {
                form.addEventListener('submit', handleFormSubmission);
            });
        }
    }
}

function changerQuantite(index: number, delta: number): void {
    let panier: Commande[] = JSON.parse(localStorage.getItem("panier") || "[]");
    panier[index].quantite += delta;
    if (panier[index].quantite < 1) panier[index].quantite = 1; // Minimum quantity is 1
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier(); // Refresh the panier display to show updated quantities
}

function handleFormSubmission(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const index = parseInt(form.getAttribute('data-index')!, 10);
    const telephoneInput = form.querySelector('input[name="telephone"]') as HTMLInputElement;
    const lieuInput = form.querySelector('input[name="lieu"]') as HTMLInputElement;
    
    const livraison: Livraison = {
        telephone: telephoneInput.value,
        lieu: lieuInput.value
    };

    let panier: Commande[] = JSON.parse(localStorage.getItem("panier") || "[]");
    panier[index].livraison = livraison;
    localStorage.setItem("panier", JSON.stringify(panier));
    
    alert('Informations de livraison enregistrées pour ' + panier[index].nom + ' Terminer votre commande sur WhatsApp nous vous recontacteront Merci!');
    envoyerCommandeWhatsApp(index);
    afficherPanier(); // Refresh the panier display to show updated delivery info
}

function envoyerCommandeWhatsApp(index: number): void {
    const panier: Commande[] = JSON.parse(localStorage.getItem("panier") || "[]");
    const commande = panier[index];
    const message = `Bonjour, je souhaite commander ${commande.quantite} ${commande.nom}(s) pour un total de ${commande.prix * commande.quantite}GNF. Lieu de livraison ${commande.livraison?.lieu}. Mon numéro de téléphone est ${commande.livraison?.telephone}.`;

    const whatsappUrl = `https://wa.me/611969311?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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



/////pour le h1///
document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById('animation-heading') as HTMLElement;
    const text = "Votre Panier ";
    const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
  
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('hidden');
        heading.appendChild(span);
    });
  
    const spans = heading.querySelectorAll('span');
  
    spans.forEach((span, index) => {
        setTimeout(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            (span as HTMLElement).style.color = randomColor;
            span.classList.remove('hidden');
            span.classList.add('visible');
        }, index * 200);  // Ajustez le délai (200ms) selon vos préférences
    });
  });