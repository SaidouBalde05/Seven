// Liste des chemins vers les images de fond
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
setInterval(setRandomBackgroundImage, 5000);
