// const showImageBtn = document.getElementById('showImageBtn');
// const imageOverlay = document.getElementById('imageOverlay');
// const closeBtn = document.getElementById('closeBtn');

// showImageBtn.addEventListener('click', () => {
//     imageOverlay.style.display = 'block';
// });

// closeBtn.addEventListener('click', () => {
//     imageOverlay.style.display = 'none';
// });

// imageOverlay.addEventListener('click', (event) => {
//     if (event.target === imageOverlay) {
//         imageOverlay.style.display = 'none';
//     }
// });

const showImageBtn = document.getElementById('showImageBtn');
const imageOverlay = document.getElementById('imageOverlay');
const closeBtn = document.getElementById('closeBtn');
const imageContainer = document.getElementById('imageContainer');
const displayedImage = document.getElementById('displayedImage');

function adjustImageSize() {
    const maxWidth = Math.min(window.innerWidth - 40, 800); // 最大宽度，减去边距
    const maxHeight = window.innerHeight - 100; // 最大高度，留出顶部空间

    // 重置容器和图片的样式
    imageContainer.style.width = 'auto';
    imageContainer.style.height = 'auto';
    displayedImage.style.width = 'auto';
    displayedImage.style.height = 'auto';

    // 调整图片大小
    if (displayedImage.naturalWidth > maxWidth || displayedImage.naturalHeight > maxHeight) {
        const ratio = Math.min(maxWidth / displayedImage.naturalWidth, maxHeight / displayedImage.naturalHeight);
        displayedImage.style.width = `${displayedImage.naturalWidth * ratio}px`;
        displayedImage.style.height = `${displayedImage.naturalHeight * ratio}px`;
    }

    // 调整容器大小以适应图片
    imageContainer.style.width = `${displayedImage.offsetWidth + 20}px`; // 加上内边距
    imageContainer.style.height = `${displayedImage.offsetHeight + 20}px`; // 加上内边距

    // 确保容器居中
    imageContainer.style.left = '50%';
    imageContainer.style.transform = 'translateX(-50%)';
}

// 在图片加载完成后调整大小
displayedImage.onload = adjustImageSize;

// 在窗口大小改变时重新调整
window.addEventListener('resize', adjustImageSize);

showImageBtn.addEventListener('click', () => {
    imageOverlay.style.display = 'block';
    adjustImageSize(); // 显示时调整大小
});

closeBtn.addEventListener('click', () => {
    imageOverlay.style.display = 'none';
});

imageOverlay.addEventListener('click', (event) => {
    if (event.target === imageOverlay) {
        imageOverlay.style.display = 'none';
    }
});

// 初始调整大小
adjustImageSize();