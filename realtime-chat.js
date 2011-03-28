var http = require('http'),
	sys = require('sys'),
	fs = require('fs'),
	io = require('socket.io');

require('response');

var server = http.createServer(function(req, res) {
	fs.readFile('chat.html', 'binary', function(err, data) {
		if( err ) {
			res.writeHead(500, {'Content-type': 'text/html'});
			res.write(data + "\n");
			res.close();
			return;
		}

		res.writeHead(200, {'Content-type': 'text/html'});
		res.write(data, 'binary');
		res.end();
	});
});
server.listen(3000);

var socket = io.listen(server);
socket.on('connection', function( client ) {
	client.on('message', function(data) {
		console.log("Message: " + JSON.stringify(data));
		socket.broadcast(data);
	});
	client.on('disconnect', function() {
	});
});
