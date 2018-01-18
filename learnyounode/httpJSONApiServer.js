const http = require('http');
const url = require('url');

let server = http.createServer();

server.on('request', (request, response) => {
	if (request.method === 'GET') {
		let parsedURL = url.parse(request.url, true);
		let date = new Date(parsedURL.query.iso);

		response.writeHead(200, {'Content-Type': 'application/json'});

		if (parsedURL.pathname === '/api/parsetime') {
			let jsonDate = {
				'hour': date.getHours(),
				'minute': date.getMinutes(),
				'second': date.getSeconds()
			}
			response.end(JSON.stringify(jsonDate))
		}
		if (parsedURL.pathname === '/api/unixtime') {
			let jsonUnixTime = {
				'unixtime': date.getTime()
			}
			response.end(JSON.stringify(jsonUnixTime));
		}
	} 
}).on('error', error => console.log(error));

server.listen(process.argv[2]);