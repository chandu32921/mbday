const picContainer = document.getElementById('pic-container');
const disappearButton = document.getElementById('disappear-button');

const imageUrls = [
  'pic1.png',
  'pic2.jpg',
  'pic3.jpg',
];

const wishes = [
  "My Dearest Jyothsna, Happy Birthday, my love! 🎉 As the sun rises on this special day, my heart is bursting with joy. From that day we met on the train in January to now, every moment with you has been a treasure. Your smile is my sunshine, brightening even the gloomiest days. The way you accepted my love in October filled my heart with warmth, and since then, life has been a beautiful journey with you. Approaching your birthday, I'm so excited! I want to make today as extraordinary for you as you've made every day for me. Your hesitancy to express love, it only makes me admire the kindness in your heart even more. The term 'baby' that you call me is like a sweet melody, a constant reminder of our love story. Your short hair, framing your face, adds to your charm. You are my muse, my living masterpiece. Remember the 'Naked Truths' game? It brought us closer, revealing our true selves. Your vulnerability and honesty deepened our connection, laying the foundation for the love we share now. On your birthday, I wish you endless laughter, boundless joy, and all the things that make you happy. May the love you've given me come back to you in abundance. Happy Birthday, my love. Here's to the beautiful memories we've made and the countless ones ahead. With each passing day, my love for you grows, and I feel blessed to have you by my side."
];

function calculateImageSize() {
  const screenWidth = document.documentElement.clientWidth;
  const imageWidth = screenWidth * 0.1;
  const numImagesFactor = 2;
  const numImages = Math.ceil(screenWidth / imageWidth) * numImagesFactor + 1;
  return { width: imageWidth, numImages };
}

function getRandomPosition(imageSize) {
  const screenWidth = document.documentElement.clientWidth;
  const screenHeight = document.documentElement.clientHeight;
  const randomX = Math.floor(Math.random() * (screenWidth - imageSize.width));
  const randomY = Math.floor(Math.random() * (screenHeight - imageSize.width));
  return { x: randomX, y: randomY };
}

function createAndDisplayImages() {
  const { width: imageSizeWidth, numImages } = calculateImageSize();

  for (let i = 0; i < numImages; i++) {
    for (let j = 0; j < imageUrls.length; j++) {
      const img = new Image();
      img.src = imageUrls[j];
      img.style.width = `${imageSizeWidth}px`;
      img.style.height = 'auto';
      img.style.opacity = 0;
      img.style.position = 'absolute';

      const randomPosition = getRandomPosition({ width: imageSizeWidth });
      img.style.left = `${randomPosition.x}px`;
      img.style.top = `${randomPosition.y}px`;

      const randomScale = Math.random() * (1.5 - 0.5) + 0.5;
      img.style.transform = `translate(-50%, -50%) scale(${randomScale})`;
      img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      img.addEventListener('mousedown', (event) => startDragging(event, img));
      img.addEventListener('touchstart', (event) => startDragging(event, img));

      // Apply fade-in and random scale animation with delay
      setTimeout(() => {
        picContainer.appendChild(img);
        img.style.opacity = 1;
      }, i * 300 + j * 100);
    }
  }
}

function startDragging(event, element) {
  let offsetX, offsetY;

  const moveElement = (event) => {
    let x, y;

    if (event.type === 'mousemove') {
      x = event.clientX - offsetX;
      y = event.clientY - offsetY;
    } else if (event.type === 'touchmove' && event.touches.length === 1) {
      x = event.touches[0].clientX - offsetX;
      y = event.touches[0].clientY - offsetY;
    }

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  };

  const stopDragging = () => {
    if (event.type === 'mousemove') {
      window.removeEventListener('mousemove', moveElement);
      window.removeEventListener('mouseup', stopDragging);
    } else if (event.type === 'touchmove') {
      window.removeEventListener('touchmove', moveElement);
      window.removeEventListener('touchend', stopDragging);
    }
  };

  if (event.type === 'mousedown') {
    offsetX = event.clientX - element.getBoundingClientRect().left;
    offsetY = event.clientY - element.getBoundingClientRect().top;
    window.addEventListener('mousemove', moveElement);
    window.addEventListener('mouseup', stopDragging);
  } else if (event.type === 'touchstart' && event.touches.length === 1) {
    offsetX = event.touches[0].clientX - element.getBoundingClientRect().left;
    offsetY = event.touches[0].clientY - element.getBoundingClientRect().top;
    window.addEventListener('touchmove', moveElement);
    window.addEventListener('touchend', stopDragging);
  }
}

function disappearAll() {
  const allImages = document.querySelectorAll('#pic-container img');
  allImages.forEach((img) => {
    img.style.opacity = 0;
    setTimeout(() => {
      picContainer.removeChild(img);
    }, 800);
  });

  displayWishes();
}

function displayWishes() {
  const wishesContainer = document.createElement('div');
  wishesContainer.id = 'wishes-container';
  wishesContainer.style.position = 'absolute';
  wishesContainer.style.top = '50%';
  wishesContainer.style.left = '50%';
  wishesContainer.style.transform = 'translate(-50%, -50%)';
  wishesContainer.style.textAlign = 'center';
  wishesContainer.style.fontFamily = 'cursive';
  wishesContainer.style.fontSize = '24px';
  wishesContainer.style.color = '#333';

  picContainer.appendChild(wishesContainer);

  wishes.forEach((wish, lineIndex) => {
    const lineContainer = document.createElement('p');
    wishesContainer.appendChild(lineContainer);

    for (let charIndex = 0; charIndex < wish.length; charIndex++) {
      setTimeout(() => {
        lineContainer.textContent += wish[charIndex];
      }, charIndex * 50 + lineIndex * 200);
    }
  });
}

createAndDisplayImages();

disappearButton.addEventListener('click', disappearAll);

window.addEventListener('resize', () => {
  picContainer.innerHTML = '';
  createAndDisplayImages();
});
