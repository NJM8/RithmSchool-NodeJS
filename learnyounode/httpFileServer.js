const fs = require('fs');
const http = require('http');

let server = http.createServer();

server.on('request', (request, response) => {
	let src = fs.createReadStream(process.argv[3]);
	src.pipe(response);
})

server.listen(process.argv[2]);
