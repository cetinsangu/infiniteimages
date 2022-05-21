const imgContainer = document.getElementById('image-container'),
  loader = document.getElementById('loader');

let photosArray = [];
(ready = false), (imagesLoaded = 0), (totalImages = 0);

const count = 20;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=TLM-WdAj9gLURpxVG-3lDtdXiZFv_ZH0l-3r5NQN-TI&count=${count}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function attributionSetter(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    attributionSetter(item, {
      href: photo.links.html,
      target: '_blank',
    });
    const img = document.createElement('img');
    attributionSetter(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

async function getImage() {
  try {
    const response = await fetch(API_URL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 &&
    ready
  ) {
    ready = false;
    getImage();
  }
});

getImage();
