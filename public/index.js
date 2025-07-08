const ws = new WebSocket('/chatroom');

ws.onopen = () => {
  console.log('Connected to the WebSocket server.');
};

ws.onmessage = event => {
  const msgObj = JSON.parse(event.data);
  console.log('Message received from server:', msgObj);
};

ws.onerror = error => {
  console.error('WebSocket error:', error);
};

ws.onclose = event => {
  console.log('WebSocket connection closed:', event);
};

function sendMessage(username, text) {
  const message = {
    username: username,
    text: text,
  };
  ws.send(JSON.stringify(message));
}
