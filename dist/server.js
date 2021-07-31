"use strict";

var app = require("./app");

var debug = require("debug")("node-angular");

var http = require("http");

var normalizePort = function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

var onError = function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "pipe " + port : "port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;

    default:
      throw error;
  }
};

var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

var port = normalizePort(process.env.PORT || "5000");
app.set("port", port);
var server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, function () {
  console.log("Server started on port ".concat(port));
});