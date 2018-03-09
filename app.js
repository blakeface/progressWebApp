const express = require('express')
const app = express()

app.get('/', app.use(express.static(__dirname + '/public')))

app.listen(3000, () => console.log('Hi sucka! Listening on port 3000!'))