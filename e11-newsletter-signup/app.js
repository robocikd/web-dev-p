const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, function () {
	console.log(`App is running on port ${PORT}`);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};
	const dataJson = JSON.stringify(data);
	const url = 'https://us10.api.mailchimp.com/3.0/lists/{yourListId}';
	const options = {
		method: 'POST',
		auth: 'damian:{yourApiKey}',
	};
	const request = https.request(url, options, function (response) {
		const statusCode = response.statusCode;

		if (statusCode === 200) {
			res.sendFile(`${__dirname}/success.html`);
		} else {
			res.sendFile(`${__dirname}/failure.html`);
		}

		response.on('data', function (data) {
			console.log(JSON.parse(data));
		});
	});
	request.write(dataJson);
	request.end();
});

app.post('/failure', function (req, res) {
	res.redirect('/');
});
