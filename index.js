import fetchImg from './fetchImage.js'

// register service worker (serviceWorker isn't available everywhere... 🍎)
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceWorker.js')
		.then(() => console.log('in index.js: service worker installed'))
		.catch(err => console.error('🚨 in index.js:', err))
}
// no service workers, just load image into DOM
else {
	fetchImg.then(imgJSON => {
		document.querySelector('#potatoGif').src = imgJSON.data.image_url
	});
}