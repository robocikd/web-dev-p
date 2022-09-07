const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
	console.log(req);
	res.send('Hello');
});

app.get('/contact', function (req, res) {
	res.send('Contact me at: damian@damian.pl');
});

app.get('/about', function (req, res) {
	res.send('Damiano');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
