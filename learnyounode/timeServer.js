const net = require('net');

let server = net.createServer(socket => {
	let date = new Date();
	let dateString = `${date.toISOString().substring(0, 10)} ${date.getHours()}:${date.getMinutes()}\n`;
	socket.write(dateString);
	socket.end();
})

server.listen(process.argv[2]);