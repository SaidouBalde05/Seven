// Liste des chemins vers les images
const image: string[] = [
    'img/img1.png',
    'img/img2.png',
    'img/img3.png',
    'img/img4.png'
];

// Fonction pour choisir une image aléatoirement
function setRandomBackgroundImage(): void {
    const randomIndex: number = Math.floor(Math.random() * image.length);
    const selectedImage: string = image[randomIndex];
    document.body.style.backgroundImage = `url(${selectedImage})`;
}

// Appeler la fonction pour définir l'image de fond aléatoire
setRandomBackgroundImage();

// Changer l'image de fond toutes les 5 secondes
setInterval(setRandomBackgroundImage, 3000);

const text: string = "Bienvenue_sur_votre_boutique_en_ligne_que_desirer-vous:";
let index: number = 0;

function type(): void {
  const typedTextElement: HTMLElement | null = document.getElementById('typed-text');
  if (typedTextElement) {
    typedTextElement.innerText += text[index];
  }
  index++;
  if (index < text.length) {
    setTimeout(type, 200); // Délai entre chaque lettre (en millisecondes)
  }
}

type(); // Appeler la fonction pour commencer la "frappe"
