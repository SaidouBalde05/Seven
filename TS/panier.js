function initialiserLocalStorage() {
    var timestamp = localStorage.getItem("timestamp");
    if (timestamp) {
        var now = Date.now();
        var diff = now - parseInt(timestamp, 10);
        var oneDay = 60000;
        // const oneDay = 24 * 60 * 60 * 1000; // 24 heures en millisecondes
        if (diff > oneDay) {
            localStorage.clear();
            localStorage.setItem("timestamp", now.toString());
        }
    }
    else {
        localStorage.setItem("timestamp", Date.now().toString());
    }
}
function ajouterAuPanier(nom, prix, image) {
    initialiserLocalStorage();
    var commande = {
        nom: nom,
        prix: prix,
        quantite: 1,
        image: image
    };
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    panier.push(commande);
    localStorage.setItem("panier", JSON.stringify(panier));
    window.location.href = "panier.html";
}
function afficherPanier() {
    initialiserLocalStorage();
    var panier = JSON.parse(localStorage.getItem("panier") || "[]");
    var panierDiv = document.getElementById("panier");
    if (panierDiv) {
        if (panier.length === 0) {
            panierDiv.innerHTML = '<p class="text-3xl font-semibold">Votre panier est vide</p>';
        }
        else {
            panier.forEach(function (commande) {
                var commandeDiv = document.createElement("div");
                commandeDiv.className = "w-full flex items-center p-4 bg-white shadow-md rounded-lg";
                commandeDiv.innerHTML = "\n                    <img src=\"".concat(commande.image, "\" alt=\"").concat(commande.nom, "\" class=\"w-20 h-20 object-cover rounded mr-4\">\n                    <div>\n                        <p class=\"text-xl font-semibold\">").concat(commande.nom, "</p>\n                        <p>").concat(commande.prix, "\u20AC - Quantit\u00E9: ").concat(commande.quantite, "</p>\n                    </div>\n                ");
                panierDiv.appendChild(commandeDiv);
            });
        }
    }
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
