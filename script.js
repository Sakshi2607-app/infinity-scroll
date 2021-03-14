const imageContainer = document.getElementById('image-container');


const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash API
const count = 30;
const apiKey='TScwn_-TA73X6uNRBUhmI6YC1Rfz7BrprrL3u34793w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


// Display
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

   
     img.addEventListener('load', imageLoaded);
    // put <img> inside <a> , then put both inside imageContainer
    item.appendChild(img);

    imageContainer.appendChild(item);
    
    });
}

// Get photos from API

async function getPhotos(){
    try{
   const response = await fetch(apiUrl);
   photosArray = await response.json();
   loader.hidden = true;
    displayPhotos();
    }
    catch(error){

    }
}

// check to see if scrolling near bottom of page, load more images

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready = false;
        getPhotos();
    }
});

// On Load

getPhotos();