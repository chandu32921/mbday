const picContainer = document.getElementById('pic-container');
const wishesTextarea = document.getElementById('wishes');
const wishesText = document.createElement('div');
wishesText.classList.add('wishes-text');

const imageUrls = [
  'pic1.png',
  'pic2.jpg',
  'pic3.jpg',
];

function calculateImageSize() {
  const screenWidth = document.documentElement.clientWidth;

  // Calculate the width for each image based on the screen size
  const imageWidth = screenWidth * 0.1;

  // Calculate the number of images needed to fill the screen horizontally
  const numImagesFactor = 2; // You can adjust this factor to increase or decrease repetition
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
      img.style.height = 'auto'; // Maintain the aspect ratio
      img.style.opacity = 0; // Start with opacity 0 for fade-in effect
      img.style.position = 'absolute';

      const randomPosition = getRandomPosition({ width: imageSizeWidth });
      img.style.left = `${randomPosition.x}px`; // Adjust left position
      img.style.top = `${randomPosition.y}px`;

      const randomScale = Math.random() * (1.5 - 0.5) + 0.5; // Random scale between 0.5 and 1.5
      img.style.transform = `translate(-50%, -50%) scale(${randomScale})`;
      img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

      picContainer.appendChild(img);

      // Apply fade-in and random scale animation
      setTimeout(() => {
        img.style.opacity = 1;
      }, i * 300 + j * 100); // Adjust the timing as needed
    }
  }

  // After all images are loaded, randomly select one image as the background
  const randomBackgroundIndex = Math.floor(Math.random() * imageUrls.length);
  const randomBackgroundImage = new Image();
  randomBackgroundImage.src = imageUrls[randomBackgroundIndex];
  randomBackgroundImage.style.width = '100%';
  randomBackgroundImage.style.height = '100%';
  randomBackgroundImage.style.objectFit = 'cover';
  randomBackgroundImage.style.position = 'absolute';
  randomBackgroundImage.style.opacity = 0;

  picContainer.appendChild(randomBackgroundImage);

  // Apply fade-in animation for the background image
  setTimeout(() => {
    randomBackgroundImage.style.opacity = 1;
  }, numImages * 300);

  // Clear all images after the fade-out animation
  setTimeout(() => {
    picContainer.innerHTML = '';
  }, (numImages + 1) * 300);

  picContainer.appendChild(wishesText);
}

createAndDisplayImages();

wishesTextarea.addEventListener('input', () => {
  wishesText.innerText = wishesTextarea.value;
});

// Update images on window resize
window.addEventListener('resize', () => {
  picContainer.innerHTML = ''; // Clear existing images
  createAndDisplayImages();
});
