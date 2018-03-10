const express = require('express')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: true })
const app = express()

// statically load everything in public dir
app.get('/', app.use(express.static(__dirname + '/public')))

// listen on port 3000
app.listen(3000, () => console.log('Hi sucka! Listening on port 3000!'))

// handle form submit
app.post('/submit', urlEncodedParser, (req, res) => {
	var surveyResponse = {
		'datatime': Date.now(),
		'answers': req.body,
		'headers': req.headers,
	}

	console.log("surveyResponse:\n", surveyResponse)

	res.redirect('/')
})

