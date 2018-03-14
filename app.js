const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// statically load everything in public dir
app.get('/', app.use(express.static(__dirname + '/public')))

// listen on port 3000
app.listen(3000, () => console.log('Hi sucka! Listening on port 3000!'))

// handle form submit
app.post('/submit', bodyParser.urlencoded({ extended: true }), (req, res) => {
	const surveyResponse = {
		'datetime': Date.now(),
		'answers': req.body,
		'headers': req.headers,
	}

	const responseHTML = `
		<h1>Cool response data, bro</h1>
		<p>Express handling the response. Data:</p>
		<pre>${ JSON.stringify(surveyResponse, null, "\t") }</pre>
	`;

	res.send(responseHTML)
})

