const ws = new WebSocket('/chatroom');

//#region Código de Mensajes

ws.onopen = () => {
  console.log('Connected to the WebSocket server.');
};

ws.onmessage = event => {
  const msgObj = JSON.parse(event.data);
  console.log('Message received from server:', msgObj);
  showMessage(msgObj);
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

function showMessage(msgObj) {
  // TODO mostrar el mensaje en la página
}

//#region Código de UI

const nombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');

enviar.onclick = () => {
  const username = nombre.value;
  const text = mensaje.value;
  sendMessage(username, text);
};
