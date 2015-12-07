// Create a Node HTTP server that serves up the requested file
// The server accepts 2 query parameters: from and to
// Before sending out the file, change all instance of from in the file to to
// Example: http://localhost:1337/index.html?from=hello&to=bye will change all instances of hello in index.html to bye

//This one works!!

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var app = http.createServer( function( request, response) {
  var parsedUrl = url.parse( request.url, true);
  console.log( parsedUrl );
  fs.readFile( path.join('.', parsedUrl.pathname), 'utf8', function( err, contents ) {
    if ( err ) {
      response.statusCode = 404;
      response.end ( '404' );
      return;
    } else {
      response.statusCode = 200;
      var regex = new RegExp( parsedUrl.query.from, 'gi');
      response.end( contents.replace( regex, parsedUrl.query.to));
    }
  });
});

app.listen( 8080, function() {
  console.log('Server is listening on Port 8080');
});
