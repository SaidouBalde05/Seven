document.addEventListener("DOMContentLoaded", function () {
    var heading = document.getElementById('animated-heading');
    var text = "Vetement pour Homme ";
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
window.onload = function () {
    var logos = document.querySelectorAll('.image');
    var overlay = document.getElementById('overlay');
    var overlayImage = document.getElementById('overlayImage');
    var closeBtn = document.querySelector('#overlay .close');
    logos.forEach(function (logo) {
        logo.addEventListener('click', function () {
            if (overlay && overlayImage) {
                overlayImage.setAttribute('src', logo.src);
                overlay.style.display = 'flex';
            }
        });
    });
    if (overlay) {
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay || event.target === closeBtn) {
                overlay.style.display = 'none';
            }
        });
    }
};
