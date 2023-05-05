const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  console.log(`Got ${req.method} ${req.url}`);
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream('./options.html', 'UTF-8').pipe(res);
  } else if (req.method === 'OPTIONS') {
    res.writeHead(204, { 
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control': 'no-cache'
     });
    res.end();
  } else {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', function () {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      console.log(`Data received: ${body.length}`);
      res.end(`{"received":"${body}"}`);
    });
  }
}).listen(3000);