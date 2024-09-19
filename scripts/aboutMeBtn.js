const showImageBtn = document.getElementById('showImageBtn');
const imageOverlay = document.getElementById('imageOverlay');
const closeBtn = document.getElementById('closeBtn');

showImageBtn.addEventListener('click', () => {
    imageOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the background
});

closeBtn.addEventListener('click', closeOverlay);

imageOverlay.addEventListener('click', (event) => {
    if (event.target === imageOverlay) {
        closeOverlay();
    }
});

function closeOverlay() {
    imageOverlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Close overlay on escape key press
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeOverlay();
    }
});