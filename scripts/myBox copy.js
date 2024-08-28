// // 創建粒子函數
// function createParticle() {
//   const particle = document.createElement('div');
//   particle.classList.add('particle');

//   // 隨機決定粒子大小
//   if (Math.random() < 0.7) {
//     particle.classList.add('small');
//   } else {
//     particle.classList.add('large');
//   }

//   // 設置粒子的初始位置
//   const x = Math.random() * window.innerWidth;
//   const y = window.innerHeight;

//   particle.style.left = `${x}px`;
//   particle.style.top = `${y}px`;

//   document.getElementById('container').appendChild(particle);

//   // 粒子上升動畫
//   let position = y;
//   const speed = Math.random() * 0.5 + 1;
//   let offsetX = 0;

//   const animation = setInterval(() => {
//     position -= speed;

//     // 檢查粒子是否接近Logo並計算偏移量
//     const offset = checkCollision(particle, position);
//     offsetX += offset.x;

//     // 更新粒子位置，包括X軸偏移
//     particle.style.transform = `translate(${offsetX}px, 0)`;
//     particle.style.top = `${position}px`;

//     // 如果粒子超出視窗頂部，則移除粒子
//     if (position < 0) {
//       clearInterval(animation);
//       particle.remove();
//     }
//   }, 20);
// }

// // 檢查粒子是否接近Logo並計算偏移量
// function checkCollision(particle, position) {
//   const logo = document.getElementById('logo');
//   const logoRect = logo.getBoundingClientRect();
//   const particleRect = particle.getBoundingClientRect();

//   const collisionRange = 100;

//   if (particleRect.left < logoRect.right + collisionRange &&
//     particleRect.right > logoRect.left - collisionRange &&
//     particleRect.top < logoRect.bottom + collisionRange &&
//     particleRect.bottom > logoRect.top - collisionRange) {

//     const logoCenterX = logoRect.left + logoRect.width / 2;
//     const logoCenterY = logoRect.top + logoRect.height / 2;
//     const particleCenterX = particleRect.left + particleRect.width / 2;
//     const particleCenterY = particleRect.top + particleRect.height / 2;

//     const dx = particleCenterX - logoCenterX;
//     const dy = particleCenterY - logoCenterY;

//     const distance = Math.sqrt(dx * dx + dy * dy);
//     const repelForce = 1 - (distance / (collisionRange + Math.max(logoRect.width, logoRect.height) / 2));

//     const offsetX = dx * repelForce * 0.1;

//     return { x: offsetX };
//   }

//   return { x: 0 };
// }

// // 每隔一段時間創建新粒子
// setInterval(createParticle, 100);

// // 滑鼠互動功能
// const logo = document.getElementById('logo');
// let isDragging = false;
// let previousMousePosition = { x: 0, y: 0 };
// let rotationX = 0;
// let rotationY = 0;
// let autoRotationAnimationId;

// // 自動旋轉函數
// function autoRotate() {
//   // 加快自動旋轉速度
//   rotationY += 0.75; // 原來是 0.5，現在增加 50%
//   rotationX += 0.45; // 原來是 0.3，現在增加 50%
//   updateCubeRotation();
//   autoRotationAnimationId = requestAnimationFrame(autoRotate);
// }

// // 更新立方體旋轉
// function updateCubeRotation() {
//   const cube = logo.querySelector('.cube');
//   cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
// }

// // 滑鼠按下事件處理
// logo.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   previousMousePosition = { x: e.clientX, y: e.clientY };
//   cancelAnimationFrame(autoRotationAnimationId);
// });

// // 滑鼠移動事件處理
// document.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;

//   const deltaX = e.clientX - previousMousePosition.x;
//   const deltaY = e.clientY - previousMousePosition.y;

//   rotationY += deltaX * 0.5;
//   rotationX -= deltaY * 0.5;

//   updateCubeRotation();

//   previousMousePosition = { x: e.clientX, y: e.clientY };
// });

// // 滑鼠釋放事件處理
// document.addEventListener('mouseup', () => {
//   isDragging = false;
//   // 立即恢復自動旋轉
//   autoRotate();
// });

// // 立即開始自動旋轉
// autoRotate();


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

function checkCollision(particle, position) {
    const logo = document.getElementById('logo');
    const logoRect = logo.getBoundingClientRect();
    const particleRect = particle.getBoundingClientRect();
    
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

setInterval(createParticle, 100);

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

autoRotate();