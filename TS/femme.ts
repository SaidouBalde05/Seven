document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById('animated-heading') as HTMLElement;
    const text = "Vetement pour Femme ";
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