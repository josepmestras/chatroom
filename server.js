const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5555;

async function fetch(req, server) {
  const url = new URL(req.url);

  if (url.pathname === '/chatroom') {
    const success = server.upgrade(req);
    if (success) {
      return undefined;
    }
  }

  let filePath;
  if (url.pathname === '/') {
    filePath = path.join(__dirname, 'public', 'index.html');
  } else {
    filePath = path.join(__dirname, 'public', url.pathname);
  }

  const file = Bun.file(filePath);
  if (await file.exists()) {
    return new Response(file);
  } else {
    return new Response('File not found', { status: 404 });
  }
}

const server = Bun.serve({
  port: PORT,
  fetch,
  websocket: {
    message(ws, message) {
      try {
        console.log('Got message: ' + message);
        const data = JSON.parse(message);

        if (data.username && data.text) {
          const messageToSend = JSON.stringify({
            username: data.username,
            text: data.text,
            timestamp: new Date().toISOString(),
          });

          ws.publish('chatroom', messageToSend); // Send message to all other subscribers
          ws.send(messageToSend); // Send message back to originator web socket
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    },

    open(ws) {
      ws.subscribe('chatroom');
    },

    close(ws) {
      ws.unsubscribe('chatroom');
    },
  },
});

console.log(`Server running on port ${PORT}`);
