var http = require ('http');
var url = require ('url');
var port = 1337;

function handler ( request, response ) {
  response.statusCode = 200;
  console.log( Object.keys( request ) );
  var parsedUrl = url.parse(request.url);
  response.end(parsedUrl.pathname);
}

var server = http.createServer( handler );

server.listen( port, function( request, response ) {
  console.log( 'Start listening on port ', port );
});
