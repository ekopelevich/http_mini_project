// Create a Node HTTP server that serves up the requested file
// The server accepts 2 query parameters: from and to
// Before sending out the file, change all instance of from in the file to to
// Example: http://localhost:1337/index.html?from=hello&to=bye will change all instances of hello in index.html to bye

var http = require ('http');
var url = require ('url');
var fs = require ('fs');
var path = require ('path');
var port = 1337;

function handler ( request, response ) {

  response.statusCode = 200;
  console.log( Object.keys( request ) );
  var parsedUrl = url.parse( request.url, true );
  console.log( parsedUrl );
  var pathname = parsedUrl.pathname;
  console.log( pathname );

  fs.readFile( 'index.html', function( err, contents ) {

    if( err ) {
      response.statusCode = 404;
      response.end('404');
      return;
    }
    response.setHeader( 'Content-type', 'text/html' );
    response.statusCode = 200;

    console.log( parsedUrl.query );

    if ( parsedUrl.query ) {
      parsedUrl.query.from = parsedUrl.query.to;
    }


    console.log( parsedUrl.query.from );
    console.log( parsedUrl.pathname.path );

    response.end( pathname );
  });
}

var server = http.createServer( handler );

server.listen( port, function( request, response ) {
  console.log( 'Start listening on port ', port );
});
