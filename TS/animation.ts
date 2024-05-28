document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById('animated-heading') as HTMLElement;
    const text = "Bonjour_et_Bienvenue_A_Seven-Shopping_que_desirer-vous: ";
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
    ///pour l'animation des Paragraphe
  document.addEventListener('DOMContentLoaded', () => {
    const p = document.getElementById('color-changing-text') as HTMLParagraphElement | null;
    const colors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500','text-orange-500'];

    let currentIndex = 0;

    if (p) {
        setInterval(() => {
            p.classList.remove(...colors);
            p.classList.add(colors[currentIndex]);
            currentIndex = (currentIndex + 1) % colors.length;
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const p = document.getElementById('Accueil') as HTMLParagraphElement | null;
    const colors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500','text-orange-500'];

    let currentIndex = 0;

    if (p) {
        setInterval(() => {
            p.classList.remove(...colors);
            p.classList.add(colors[currentIndex]);
            currentIndex = (currentIndex + 1) % colors.length;
        }, 500);
    }
});
   ///Pour les image aleatoire de la page d'accueil
// Liste des chemins d'accès aux images dans le dossier 'img'
const images: string[] = [
    'img/img1.png',
    'img/img2.png',
    'img/img3.png',
    'img/img4.png',
    'img/logo.png',
];

let currentIndex: number = 0;

// Fonction pour changer les images
function changeImages() {
    const imgElements = document.querySelectorAll('.slideshow') as NodeListOf<HTMLImageElement>;
    imgElements.forEach((imgElement, index) => {
        imgElement.src = images[(currentIndex + index) % images.length];
    });
    currentIndex = (currentIndex + 1) % images.length;
}

// Changer les images toutes les 2 secondes
setInterval(changeImages, 2000);

// Initialiser le slideshow
changeImages();