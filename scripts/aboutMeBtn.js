const showImageBtn = document.getElementById('showImageBtn');
const imageOverlay = document.getElementById('imageOverlay');
const closeBtn = document.getElementById('closeBtn');

showImageBtn.addEventListener('click', () => {
    imageOverlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    imageOverlay.style.display = 'none';
});

imageOverlay.addEventListener('click', (event) => {
    if (event.target === imageOverlay) {
        imageOverlay.style.display = 'none';
    }
});
