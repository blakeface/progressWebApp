// make some random gif call
fetch('http://api.giphy.com/v1/gifs/random?api_key=AJ83QzrMHLZD0W5Mb29KrTZO0QpIGy6s&tag=potato')
  .then((resp) => resp.json())
  .then((json) => {
    let img = new Image()
    img.src = json.data.image_url
    document.body.appendChild(img)
  })
  .catch((err) => console.error('🚨 getting gif:', err))

// register service worker (serviceWorker isn't available everywhere... 🍎)
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceWorker.js')
		.then(() => console.log('in index.js: service worker installed'))
		.catch(err => console.error('🚨 in index.js:', err))
}