var http = require ('http');
var url = require ('url');
var fs = require ('fs');
var path = require ('path');
var port = 1337;

function handler ( request, response ) {
  console.log( url );
  var parsedUrl = url.parse( request.url, true );
  var pathname = parsedUrl.pathname;
  //console.log( path.join( '.', pathname ) );
  fs.readFile( path.join('.', pathname ), 'utf8', function( err, contents ) {
    if( err ) {
      response.statusCode = 404;
      response.end('404');
      return;
    }
    response.setHeader('Content-Type', 'text/plain');
    if (pathname.endsWith('html')) {
      response.setHeader('Content-Type', 'text/html');
    } else if (pathname.endsWith('js')) {
      response.setHeader('Content-Type', 'text/javascript');
    }
    response.setHeader( 'Content-type', 'text/plain' );
    response.statusCode = 200;
    response.end(contents);
   }

  response.setHeader( 'Content-type', 'text/plain' );
  response.statusCode = 200;
  response.end( contents );
}

var server = http.createServer( handler );

server.listen( port, function( request, response ) {
  console.log( 'Start listening on port ', port );
});
