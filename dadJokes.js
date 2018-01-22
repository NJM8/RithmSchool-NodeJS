const request = require('request');
const fs = require('fs');

let options = {
	url: 'https://icanhazdadjoke.com/search?term=', 
	method: 'GET',
	headers: {
		'Accept': 'application/json', 
	}
}

function updateURL(searchTerm){
	options.url += searchTerm;
}

updateURL(process.argv[2]);

request(options, function(error, response, body){
	if (error) {
		console.log(error);
	} else if (!error && response.statusCode === 200) {
		let jokesFound = JSON.parse(body);

		if (jokesFound.results.length === 0) {
			console.log('No Joke found, try another search.');
			return;
		}

		let joke = `${jokesFound.results[0].joke}\n`;

		console.log(joke);

		fs.appendFile('jokes.txt', joke, (err) => {
			if (err) {
				throw err;
			}
		});
	}
}).on('error', error => {
	console.log(error);
});


