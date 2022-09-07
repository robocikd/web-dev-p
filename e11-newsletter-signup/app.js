const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, function () {
	console.log(`App is running on port ${PORT}`);
});
