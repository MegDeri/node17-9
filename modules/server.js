var http = require("http");
var colors = require("colors");
var handlers = require("./handlers");

function start() {
  function onRequest(request, response) {
    console.log("Request received.".green);
    console.log("Request " + request.url + " is received.");

    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    switch (
      request.url // switch to recognise requests
    ) {
      case "/":
      case "/start":
        handlers.welcome(request, response);
        break;
      case "/upload":
        handlers.upload(request, response);
        break;
      case "/show":
        handlers.show(request, response);
        break;
      case "/style.css":
        handlers.colorCss(request, response);
        break;
      default:
        handlers.error(request, response);
    }
  }

  http.createServer(onRequest).listen(9000);

  console.log("Server started!".green);
}

exports.start = start;
