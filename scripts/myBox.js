const container = document.getElementById('container');
const logo = document.getElementById('logo');
const particles = [];

// 在 myBox.js 中添加這個函數 (手機問題)
function isMobileLandscape() {
    return window.matchMedia("(max-width: 896px) and (orientation: landscape)").matches;
}

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.classList.add(Math.random() < 0.7 ? 'small' : 'large');
    
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight;
    
    particle.style.transform = `translate(${x}px, ${y}px)`;
    particle.style.position = 'absolute';
    
    container.appendChild(particle);
    
    return {
        element: particle,
        position: { x, y },
        speed: Math.random() * 2 + 1,
        offsetX: 0
    };
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.position.y -= particle.speed;
        
        const offset = checkCollision(particle);
        particle.offsetX += offset.x;
        
        particle.element.style.transform = `translate(${particle.position.x + particle.offsetX}px, ${particle.position.y}px)`;
        
        if (particle.position.y < 0) {
            container.removeChild(particle.element);
            particles.splice(i, 1);
        }
    }
}

function checkCollision(particle) {
    const logoRect = logo.getBoundingClientRect();
    const particleRect = particle.element.getBoundingClientRect();
    
    const collisionRange = 150;
    
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

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationX = 0;
let rotationY = 0;
let autoRotationSpeed = { x: 0.45, y: 0.75 };

function updateCubeRotation() {
    const cube = logo.querySelector('.cube');
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

logo.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;

    updateCubeRotation();

    previousMousePosition = { x: e.clientX, y: e.clientY };
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

function animate() {
    if (!isDragging) {
        rotationY += autoRotationSpeed.y;
        rotationX += autoRotationSpeed.x;
        updateCubeRotation();
    }

    if (particles.length < 50 && Math.random() < 0.1) {
        particles.push(createParticle());
    }

    updateParticles();

    requestAnimationFrame(animate);
}

animate();

//---------------------------------------------------------------------------------------------



// const container = document.getElementById('container');
// const logo = document.getElementById('logo');
// const particles = [];

// // 在 myBox.js 中添加這個函數 (手機問題)
// function isMobileLandscape() {
//     return window.matchMedia("(max-width: 896px) and (orientation: landscape)").matches;
// }

// function createParticle() {
//     const particle = document.createElement('div');
//     particle.classList.add('particle');
    
//     particle.classList.add(Math.random() < 0.7 ? 'small' : 'large');
    
//     const x = Math.random() * window.innerWidth;
//     const y = window.innerHeight;
    
//     particle.style.transform = `translate(${x}px, ${y}px)`;
//     particle.style.position = 'absolute';
    
//     container.appendChild(particle);
    
//     return {
//         element: particle,
//         position: { x, y },
//         speed: Math.random() * 2 + 1,
//         offsetX: 0
//     };
// }

// function updateParticles() {
//     for (let i = particles.length - 1; i >= 0; i--) {
//         const particle = particles[i];
//         particle.position.y -= particle.speed;
        
//         const offset = checkCollision(particle);
//         particle.offsetX += offset.x;
        
//         particle.element.style.transform = `translate(${particle.position.x + particle.offsetX}px, ${particle.position.y}px)`;
        
//         if (particle.position.y < 0) {
//             container.removeChild(particle.element);
//             particles.splice(i, 1);
//         }
//     }
// }

// function checkCollision(particle) {
//     const logoRect = logo.getBoundingClientRect();
//     const particleRect = particle.element.getBoundingClientRect();
    
//     const collisionRange = 150;
    
//     if (particleRect.left < logoRect.right + collisionRange &&
//         particleRect.right > logoRect.left - collisionRange &&
//         particleRect.top < logoRect.bottom + collisionRange &&
//         particleRect.bottom > logoRect.top - collisionRange) {
        
//         const logoCenterX = logoRect.left + logoRect.width / 2;
//         const logoCenterY = logoRect.top + logoRect.height / 2;
//         const particleCenterX = particleRect.left + particleRect.width / 2;
//         const particleCenterY = particleRect.top + particleRect.height / 2;
        
//         const dx = particleCenterX - logoCenterX;
//         const dy = particleCenterY - logoCenterY;
        
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         const repelForce = 1 - (distance / (collisionRange + Math.max(logoRect.width, logoRect.height) / 2));
        
//         const offsetX = dx * repelForce * 0.1;
        
//         return { x: offsetX };
//     }
    
//     return { x: 0 };
// }

// let isDragging = false;
// let previousMousePosition = { x: 0, y: 0 };
// let rotationX = 0;
// let rotationY = 0;
// let autoRotationSpeed = { x: 0.45, y: 0.75 };

// function updateCubeRotation() {
//     const cube = logo.querySelector('.cube');
//     cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
// }

// logo.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     previousMousePosition = { x: e.clientX, y: e.clientY };
// });

// document.addEventListener('mousemove', (e) => {
//     if (!isDragging) return;

//     const deltaX = e.clientX - previousMousePosition.x;
//     const deltaY = e.clientY - previousMousePosition.y;

//     rotationY += deltaX * 0.5;
//     rotationX -= deltaY * 0.5;

//     updateCubeRotation();

//     previousMousePosition = { x: e.clientX, y: e.clientY };
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
// });

// function animate() {
//     if (!isDragging) {
//         rotationY += autoRotationSpeed.y;
//         rotationX += autoRotationSpeed.x;
//         updateCubeRotation();
//     }

//     if (particles.length < 50 && Math.random() < 0.1) {
//         particles.push(createParticle());
//     }

//     updateParticles();

//     requestAnimationFrame(animate);
// }

// animate();