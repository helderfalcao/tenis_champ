var http = require('http');
var url = require('url');
var jogadorService = require('./jogadores_service');
var campeonatoService = require('./campeonato_service');
var Server = require('mongodb-core').Server
  , assert = require('assert');

// Set up server connection
var server = new Server({
    host: 'localhost'
  , port: 27017
  , reconnect: true
  , reconnectInterval: 50
});

// Add event listeners
server.on('connect', function(_server) {
  console.log('connected');
  test.done();
});

server.on('close', function() {
  console.log('closed');
});

server.on('reconnect', function() {
  console.log('reconnect');
});

// Start connection
server.connect();
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if(url_parts.pathname == "/jogador"){
    console.log("teste");
  }
  res.end("Hello World");
  
}).listen(8080);