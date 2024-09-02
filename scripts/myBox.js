document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');

    function setCanvasSize() {
        // 確保canvas不會超過視窗大小
        const width = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const height = Math.min(window.innerHeight, document.documentElement.clientHeight);
        canvas.width = width;
        canvas.height = height;
    }

    setCanvasSize();

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            setCanvasSize();
        }, 250);
    });

    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
});

// 創建粒子效果的函數保持不變
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    if (Math.random() < 0.7) {
        particle.classList.add('small');
    } else {
        particle.classList.add('large');
    }

    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.getElementById('container').appendChild(particle);

    let position = y;
    const speed = Math.random() * 2 + 1;
    let offsetX = 0;

    const animation = setInterval(() => {
        position -= speed;

        const offset = checkCollision(particle, position);
        offsetX += offset.x;

        particle.style.transform = `translate(${offsetX}px, 0)`;
        particle.style.top = `${position}px`;

        if (position < 0) {
            clearInterval(animation);
            particle.remove();
        }
    }, 20);
}

// 碰撞檢查的函數保持不變
function checkCollision(particle, position) {
    const logo = document.getElementById('logo');
    const logoRect = logo.getBoundingClientRect();
    const particleRect = particle.getBoundingClientRect();

    const collisionRange = logoRect.width * 0.75;

    if (particleRect.left < logoRect.right + collisionRange &&
        particleRect.right > logoRect.left - collisionRange &&
        particleRect.top < logoRect.bottom + collisionRange &&
        particleRect.bottom > logoRect.top - collisionRange) {

        const logoCenterX = logoRect.left + logoRect.width / 2;
        const logoCenterY = logoRect.top + logoRect.height / 2;
        const particleCenterX = particleRect.left + particleRect.width / 2;
        const particleCenterY = particleRect.top + particleRect.height / 2;

        const dx = particleCenterX - logoCenterX;
        const dy = particleCenterY - logoCenterY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelForce = 1 - (distance / (collisionRange + Math.max(logoRect.width, logoRect.height) / 2));

        const offsetX = dx * repelForce * 0.1;

        return { x: offsetX };
    }

    return { x: 0 };
}

setInterval(createParticle, 1000);

// 以下是旋轉和拖曳效果的保持不變
const logo = document.getElementById('logo');
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationX = 0;
let rotationY = 0;
let autoRotationAnimationId;
let autoRotationSpeed = { x: 0.45, y: 0.75 };

function autoRotate() {
    if (!isDragging) {
        rotationY += autoRotationSpeed.y;
        rotationX += autoRotationSpeed.x;
        updateCubeRotation();
    }
    autoRotationAnimationId = requestAnimationFrame(autoRotate);
}

function updateCubeRotation() {
    const cube = logo.querySelector('.cube');
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

logo.addEventListener('mousedown', startDragging);
logo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDragging(e.touches[0]);
});

function startDragging(e) {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
}

document.addEventListener('mousemove', drag);
document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    drag(e.touches[0]);
});

function drag(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;

    updateCubeRotation();

    previousMousePosition = { x: e.clientX, y: e.clientY };
}

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function stopDragging() {
    isDragging = false;
}

autoRotate();
