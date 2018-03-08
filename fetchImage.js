// make some random gif call
const img = fetch('http://api.giphy.com/v1/gifs/random?api_key=AJ83QzrMHLZD0W5Mb29KrTZO0QpIGy6s&tag=potato')
  .then(resp => resp.json())
  .then(json => json)
  .catch(err => console.error('🚨 getting gif:', err))

export default img