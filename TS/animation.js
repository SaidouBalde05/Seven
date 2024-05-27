document.addEventListener("DOMContentLoaded", function () {
    var heading = document.getElementById('animated-heading');
    var text = "Bonjour_et_Bienvenue_A_Seven-Shopping_que_desirer-vous: ";
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
document.addEventListener('DOMContentLoaded', function () {
    var p = document.getElementById('color-changing-text');
    var colors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500', 'text-orange-500'];
    var currentIndex = 0;
    if (p) {
        setInterval(function () {
            var _a;
            (_a = p.classList).remove.apply(_a, colors);
            p.classList.add(colors[currentIndex]);
            currentIndex = (currentIndex + 1) % colors.length;
        }, 500);
    }
});
