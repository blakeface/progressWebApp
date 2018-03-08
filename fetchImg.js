// make some random gif call
var imgJSON;

fetch('http://api.giphy.com/v1/gifs/random?api_key=AJ83QzrMHLZD0W5Mb29KrTZO0QpIGy6s&tag=potato')
  .then((resp) => imgJSON = resp.json())
  .catch((err) => console.error('🚨 getting gif:', err))

 export default imgJSON