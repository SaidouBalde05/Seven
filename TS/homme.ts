document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById('animated-heading') as HTMLElement;
    const text = "Vetement pour Homme ";
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

  window.onload = () => {
    const logos = document.querySelectorAll('.image');
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlayImage');
    const closeBtn = document.querySelector('#overlay .close');

    logos.forEach(logo => {
        logo.addEventListener('click', () => {
            if (overlay && overlayImage) {
                overlayImage.setAttribute('src', (logo as HTMLImageElement).src);
                overlay.style.display = 'flex';
            }
        });
    });

    if (overlay) {
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay || event.target === closeBtn) {
                overlay.style.display = 'none';
            }
        });
    }
};