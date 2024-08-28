/*

這是向 Google Colab 療癒的吉祥物動畫致敬的一段 JavaScript，
經過了工人智慧（菜鳥工程師我）與人工智慧（Claude) 的激烈碰撞下艱難的誕生！
在此註解以茲紀念．

kaiser 
於113年職前訓練-中興大學AI班
2024/08

*/
const animals = [
  { src: "img/colab_cute/MANEKI.gif", alt: "吉祥物maneki" },
  { src: "img/colab_cute/KINAKO.gif", alt: "吉祥物kinako" },
  { src: "img/colab_cute/crab.gif", alt: "吉祥物crab" },
  { src: "img/colab_cute/MIDNIGHT.gif", alt: "吉祥物midnight" },
  { src: "img/colab_cute/FIREFOX.gif", alt: "吉祥物firefox" },
  { src: "img/colab_cute/STRIPES.gif", alt: "吉祥物stripes" },
  { src: "img/colab_cute/chocolatechip.gif", alt: "吉祥物chocolatechip" },
  { src: "img/colab_cute/redvelvet.gif", alt: "吉祥物redvelvet" },
  { src: "img/colab_cute/oreo2.gif", alt: "吉祥物oreo2" },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function addAnimal() {
  const container = document.getElementById('animationContainer');
  const currentAnimals = container.querySelectorAll('.animal');

  if (currentAnimals.length >= 5) {
    return; // Don't add more if there are already 5 animals
  }

  const animalIndex = Math.floor(Math.random() * animals.length);
  const animal = animals[animalIndex];
  const img = document.createElement('img');
  img.src = animal.src;
  img.alt = animal.alt;
  img.className = 'animal';

  const startLeft = Math.random() < 0.5; // 50% chance to start from left
  const duration = 30 + Math.random() * 15; // 30 to 45 seconds

  img.style.left = startLeft ? '-50px' : 'calc(100% + 50px)';
  img.style.transform = startLeft ? 'scaleX(-1)' : 'scaleX(1)';

  container.appendChild(img);

  setTimeout(() => {
    img.style.opacity = '1';
    img.style.transition = `opacity 1s, left ${duration}s linear, transform 0.5s`;

    if (startLeft) {
      img.style.left = 'calc(100% + 50px)';
    } else {
      img.style.left = '-50px';
    }
  }, 100);

  // Flip the animal when it reaches the edge
  const flipInterval = setInterval(() => {
    if ((startLeft && img.offsetLeft >= container.offsetWidth) ||
      (!startLeft && img.offsetLeft <= -50)) {
      clearInterval(flipInterval);
      img.style.transform = startLeft ? 'scaleX(1)' : 'scaleX(-1)';

      setTimeout(() => {
        img.style.left = startLeft ? '-50px' : 'calc(100% + 50px)';
      }, 500);

      // Remove the animal after it exits
      setTimeout(() => {
        container.removeChild(img);
        addAnimal(); // Add a new animal to replace this one
      }, duration * 1000);
    }
  }, 100);
}

function startAnimation() {
  shuffleArray(animals);
  for (let i = 0; i < 5; i++) {
    setTimeout(addAnimal, i * 3000); // Add an animal every 3 seconds
  }
  setInterval(addAnimal, 15000); // Try to add a new animal every 15 seconds
}

// Start the animation when the page loads
window.onload = startAnimation;
