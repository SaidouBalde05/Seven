document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('imageToEnlarge') as HTMLImageElement;

    if (image) {
        image.addEventListener('click', () => {
            image.classList.toggle('enlarged');
        });
    }
}); 
