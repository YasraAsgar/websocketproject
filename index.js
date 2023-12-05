const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);



const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
  });
});

  ws.send('Hello. Glad to see you');
});
app.use(express.static('public'));

server.listen(8080, () => {
  console.log('Server is listening on port 6002');
  
});
