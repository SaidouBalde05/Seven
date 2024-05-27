document.addEventListener('DOMContentLoaded', function () {
    var image = document.getElementById('imageToEnlarge');
    if (image) {
        image.addEventListener('click', function () {
            image.classList.toggle('enlarged');
        });
    }
});
