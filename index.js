// ✅ TODO: Initialize variables (set port variable, and import http, httpStatus, fs, path modules)
const port = 8000;
const http = require('http'),
  httpStatus = require('http-status'),
  fs = require('fs'),
  path = require('path');

const express = require('express'),
  app = express();

// Import resources for API
const resources = require("./models/resources");

// Create error handling / response
sendErrorResponse = (res) => {
  res.writeHead(404, {"Content-Type": "text/html"});
// ✅ TODO: Implement res.end with error message in h1 tags with text "Resource not found"
  res.write("<h1>Resource not found</h1>");
  res.end();
};

// Create Web Server
const server = http.createServer((req, res) => {
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
// Implement healthcheck URL at /healthcheck
  if (req.url === "/healthcheck") {
// ❓TODO: Implement healthcheck code here
      app.use('/healthcheck', require('./healthchecker.js'));
  }
  // Implement static file system and serve /views/index.html
  // ** OPTIONAL: Setup dynamic reading and serving of other static files (Hint: see lesson 6.1 Wexxler)
  else if (req.url === "/") {
    fs.readFile(path.join(__dirname, "views", "index.html"), (error, data) => {
      // ✅TODO: Implement res.writehead to send header information - 200 response content type html
      res.writeHead(200, 'Content-Type": "text/html');
      res.write('<h1>Hello, Universe!</h1>');
      // ✅TODO: Implement res.end to send data
      res.end(data);
    });
  } else {
    sendErrorResponse(res);
  }

  // Add a basic api to serve resources.js
  /*else if (req.url == "/api/resources") {
    // ❓TODO: Implement res.writeHead to send httpStatus.OK with JSON content type
    res.writeHead(200, 'Content-Type": "application/json')
    // ❓TODO: Implement res.end and use JSON.stringify to return resources
    res.end(JSON.stringify(resources.js))
  }else {
    sendErrorResponse(res);
  }*/
});
server.listen(port); // listen for any incoming requests;
console.log(`The server has started and is listening on port number: ${port}`);
