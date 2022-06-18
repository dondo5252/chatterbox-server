/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

//hardcoded data to send back
var localArray = [{
  username: 'Jono',
  text: 'Do my bidding!'
}];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
//
  // Do some basic logging.
  //s
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  //var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';


  if (request.method === 'GET' && request.url.includes('/classes/messages')) {
    response.writeHead(200, headers);
    response.end(JSON.stringify(localArray));
  } else if (request.method === 'POST' && request.url.includes('/classes/messages')) {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);

    }).on('end', () => {

      body = Buffer.concat(body).toString();
      response.writeHead(201, headers);
      localArray.push(body);
      //response.statusCode = 201;
      console.log('-------------------------', response);
      response.end(JSON.stringify(localArray));
    });
  } else if (request.method === 'GET' && !request.url.includes(request.endpoint)) {
    response.writeHead(404, headers);
    response.end('error message!');
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


exports.requestHandler = requestHandler;


// else if (request.method = 'Get' && !request.url.includes(request.endpoint)) {
//   //   response.writeHead(404, headers);
//   //   response.end('error message!');
  // }