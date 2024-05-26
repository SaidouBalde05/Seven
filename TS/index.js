// Liste des chemins vers les images
var image = [
    'img/img1.png',
    'img/img2.png',
    'img/img3.png',
    'img/img4.png'
];
// Fonction pour choisir une image aléatoirement
function setRandomBackgroundImage() {
    var randomIndex = Math.floor(Math.random() * image.length);
    var selectedImage = image[randomIndex];
    document.body.style.backgroundImage = "url(".concat(selectedImage, ")");
}
// Appeler la fonction pour définir l'image de fond aléatoire
setRandomBackgroundImage();
// Changer l'image de fond toutes les 5 secondes
setInterval(setRandomBackgroundImage, 3000);
var text = "Bienvenue_sur_votre_boutique_en_ligne_que_desirer-vous:";
var index = 0;
function type() {
    var typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        typedTextElement.innerText += text[index];
    }
    index++;
    if (index < text.length) {
        setTimeout(type, 200); // Délai entre chaque lettre (en millisecondes)
    }
}
type(); // Appeler la fonction pour commencer la "frappe"
