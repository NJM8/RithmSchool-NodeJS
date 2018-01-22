const request = require('request');

request('http://swapi.co/api/people/1', function(error, response, body){
	if (!error && response.statusCode === 200) {
		console.log(JSON.parse(body));
	}
})