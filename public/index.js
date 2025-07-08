console.log('hello!');

const ws = new WebSocket('/chatroom');

ws.onopen = () => {
  console.log('Connected to the WebSocket server.');
  setText('wsStatus', 'open');
};

ws.onmessage = event => {
  console.log('Message received from server:', event.data);
  addEvent(event.data);
};

ws.onerror = error => {
  console.error('WebSocket error:', error);
  setText('wsStatus', `error (${error})`);
};

ws.onclose = event => {
  console.log('WebSocket connection closed:', event);
  setText('wsStatus', 'closed');
};

function setText(id, value) {
  let elem = document.getElementById(id);
  if (!elem) return;
  elem.innerText = value;
}

function addEvent(data) {
  let elem = document.getElementById('wsEvents');
  if (!elem) return;
  let tstamp = new Date().toLocaleTimeString();
  elem.innerText += `${tstamp} - ${data}\n`;
}
