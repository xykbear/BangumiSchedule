var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function(request, response) {

  var filePath = '.' + request.url.replace(/(\?|\#).*/, "");
  var param = filePath.charAt(request.url.length);
  if (param === '/') {
    filePath += "index.html";
  }
  console.log('get:' + filePath);

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
    case '.json':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.mp4':
      contentType = 'video/mp4';
  }

  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        } else {
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.end(content, 'utf-8');
        }
      });
    } else {
      response.writeHead(404);
      response.end();
    }
  });


}).listen(3000);
console.log("Server started at http://localhost:3000/");