const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function () {
	console.log('Server is running on port ' + PORT);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
	const cityName = req.body.city;
	const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
	const API_KEY = '0ac763f8580b0f74a2e6fce9ac5e2641';
	const unit = 'metric';
	const url = baseURL + '?q=' + cityName + '&units=' + unit + '&appid=' + API_KEY;

	https.get(url, function (response) {
		console.log(response.statusCode);

		response.on('data', function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const iconCode = weatherData.weather[0].icon;
			const iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';

			res.write('<p>The weather is currently ' + weatherDescription + '<p>');
			res.write('<h1>Temperature in ' + cityName + ' is ' + temp + ' C degrees<h1>');
			res.write('<img src=' + iconURL + '>');
			res.send();
		});
	});
});
