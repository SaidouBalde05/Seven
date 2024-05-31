function initialiserLocalStorage() {
    var timestamp = localStorage.getItem("timestamp");
    if (timestamp) {
        var now = Date.now();
        var diff = now - parseInt(timestamp, 10);
        var oneDay = 48 * 60 * 60 * 1000; // 24 heures en millisecondes
        if (diff > oneDay) {
            localStorage.clear();
            localStorage.setItem("timestamp", now.toString());
        }
    }
    else {
        localStorage.setItem("timestamp", Date.now().toString());
    }
}
function enregistrerPagePrecedente() {
    var currentUrl = window.location.href;
    localStorage.setItem("pagePrecedente", currentUrl);
}
function ajouterAuPanier(nom, prix, image) {
    initialiserLocalStorage();
    enregistrerPagePrecedente();
    var commande = {
        nom: nom,
        prix: prix,
        quantite: 1,
        image: image,
        confirme: false
    };
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    panier.unshift(commande); // Add the new command at the beginning
    localStorage.setItem("panier", JSON.stringify(panier));
    window.location.href = "panier.html";
}
function afficherPanier() {
    initialiserLocalStorage();
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    var panierDiv = document.getElementById("panier");
    if (panierDiv) {
        if (panier.length === 0) {
            panierDiv.innerHTML = '<p class="text-xl font-semibold">Votre panier est vide</p>';
        }
        else {
            panierDiv.innerHTML = ''; // Clear existing content
            var retourBtn = document.createElement("button");
            retourBtn.innerText = "Retour";
            retourBtn.className = "bg-gray-300 text-black px-4 py-2 rounded mb-4";
            retourBtn.onclick = function () {
                var pagePrecedente = localStorage.getItem("pagePrecedente");
                if (pagePrecedente) {
                    // Remove the last unconfirmed order before going back
                    var panier_1 = JSON.parse(localStorage.getItem("panier") || "[]");
                    if (!panier_1[0].confirme) {
                        panier_1.shift();
                    }
                    localStorage.setItem("panier", JSON.stringify(panier_1));
                    window.location.href = pagePrecedente;
                }
            };
            panierDiv.appendChild(retourBtn);
            panier.forEach(function (commande, index) {
                var commandeDiv = document.createElement("div");
                commandeDiv.className = "w-full flex flex-col p-4 bg-white shadow-md rounded-lg mb-4";
                commandeDiv.innerHTML = "\n                    <div class=\"flex items-center mb-4\">\n                        <img src=\"".concat(commande.image, "\" alt=\"").concat(commande.nom, "\" class=\"w-20 h-20 object-cover rounded mr-4\">\n                        <div>\n                            <p class=\"text-xl font-semibold\">").concat(commande.nom, "</p>\n                            <p>").concat(commande.prix, "\u20AC - Quantit\u00E9: \n                                <button class=\"bg-gray-300 text-black px-2 rounded\" onclick=\"changerQuantite(").concat(index, ", -1)\">-</button>\n                                ").concat(commande.quantite, "\n                                <button class=\"bg-gray-300 text-black px-2 rounded\" onclick=\"changerQuantite(").concat(index, ", 1)\">+</button>\n                            </p>\n                        </div>\n                    </div>\n                    <form class=\"livraison-form\" data-index=\"").concat(index, "\">\n                        <h3 class=\"text-lg font-semibold mb-2\">Informations de Livraison</h3>\n                        <div class=\"mb-2\">\n                            <label for=\"telephone-").concat(index, "\" class=\"block text-sm font-medium text-gray-700\">Num\u00E9ro de t\u00E9l\u00E9phone</label>\n                            <input type=\"text\" id=\"telephone-").concat(index, "\" name=\"telephone\" class=\"mt-1 block w-full p-2 border border-gray-300 rounded-md\" required value=\"").concat(commande.livraison ? commande.livraison.telephone : '', "\">\n                        </div>\n                        <div class=\"mb-2\">\n                            <label for=\"lieu-").concat(index, "\" class=\"block text-sm font-medium text-gray-700\">Lieu de livraison</label>\n                            <input type=\"text\" id=\"lieu-").concat(index, "\" name=\"lieu\" class=\"mt-1 block w-full p-2 border border-gray-300 rounded-md\" required value=\"").concat(commande.livraison ? commande.livraison.lieu : '', "\">\n                        </div>\n                        <button type=\"submit\" class=\"bg-blue-500 text-white px-4 py-2 rounded mt-2\">Confirmer la livraison</button>\n                    </form>\n                    ").concat(commande.livraison ? "\n                    <div class=\"mt-4\">\n                        <h4 class=\"text-md font-semibold\">Informations de livraison enregistr\u00E9es :</h4>\n                        <p>Num\u00E9ro de t\u00E9l\u00E9phone : ".concat(commande.livraison.telephone, "</p>\n                        <p>Lieu de livraison : ").concat(commande.livraison.lieu, "</p>\n                    </div>\n                    ") : '', "\n                    ").concat(commande.confirme ? "<i class=\"fas fa-check-circle text-green-500 text-xl\"></i>" : '', "\n                ");
                panierDiv.appendChild(commandeDiv);
            });
            document.querySelectorAll('.livraison-form').forEach(function (form) {
                form.addEventListener('submit', handleFormSubmission);
            });
        }
    }
}
function changerQuantite(index, delta) {
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    panier[index].quantite += delta;
    if (panier[index].quantite < 1)
        panier[index].quantite = 1; // Minimum quantity is 1
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier(); // Refresh the panier display to show updated quantities
}
function handleFormSubmission(event) {
    event.preventDefault();
    var form = event.target;
    var index = parseInt(form.getAttribute('data-index'), 10);
    var telephoneInput = form.querySelector('input[name="telephone"]');
    var lieuInput = form.querySelector('input[name="lieu"]');
    var livraison = {
        telephone: telephoneInput.value,
        lieu: lieuInput.value
    };
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    panier[index].livraison = livraison;
    panier[index].confirme = true; // Mark the command as confirmed
    localStorage.setItem("panier", JSON.stringify(panier));
    alert('Informations de livraison enregistrées pour ' + panier[index].nom + ' Terminer votre commande sur WhatsApp nous vous Recontacterons Merci');
    envoyerCommandeWhatsApp(index);
    afficherPanier(); // Refresh the panier display to show updated delivery info
}
function envoyerCommandeWhatsApp(index) {
    var _a, _b;
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    var commande = panier[index];
    var message = "Bonjour, je souhaite commander ".concat(commande.quantite, " ").concat(commande.nom, "(s) pour un total de ").concat(commande.prix * commande.quantite, "GNF. Lieu de Livraison:  ").concat((_a = commande.livraison) === null || _a === void 0 ? void 0 : _a.lieu, ". Mon num\u00E9ro de t\u00E9l\u00E9phone est ").concat((_b = commande.livraison) === null || _b === void 0 ? void 0 : _b.telephone, ".");
    var whatsappUrl = "https://wa.me/611969311?text=".concat(encodeURIComponent(message));
    window.open(whatsappUrl, '_blank');
}
window.onload = function () {
    var buttons = document.querySelectorAll(".commander-btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            var produitDiv = event.target.closest(".produit");
            if (produitDiv) {
                var nom = produitDiv.getAttribute("data-nom");
                var prix = parseFloat(produitDiv.getAttribute("data-prix"));
                var image = produitDiv.getAttribute("data-image");
                ajouterAuPanier(nom, prix, image);
            }
        });
    });
    if (document.getElementById("panier")) {
        afficherPanier();
    }
};
///////////animation///////
document.addEventListener("DOMContentLoaded", function () {
    var heading = document.getElementById('animation');
    var text = "Votre Panier ";
    var colors = ["red", "green", "blue", "yellow", "purple", "orange"];
    text.split('').forEach(function (char, index) {
        var span = document.createElement('span');
        span.textContent = char;
        span.classList.add('hidden');
        heading.appendChild(span);
    });
    var spans = heading.querySelectorAll('span');
    spans.forEach(function (span, index) {
        setTimeout(function () {
            var randomColor = colors[Math.floor(Math.random() * colors.length)];
            span.style.color = randomColor;
            span.classList.remove('hidden');
            span.classList.add('visible');
        }, index * 200); // Ajustez le délai (200ms) selon vos préférences
    });
});
