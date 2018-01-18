const map = require('through2-map')
const http = require('http');

let server = http.createServer();

server.on('request', (request, response) => {
	if (request.method === 'POST') {
		request.pipe(map(chunk => chunk.toString().toUpperCase())).pipe(response);
	}
})

// still not 100% confident on how this works. I think the request is automatically being streamed through the pipe to the map filter, then out as the reponse. why do we need through2-map? It seems like you could just set something to the stream data and modify it then send it out. 

server.listen(process.argv[2]);