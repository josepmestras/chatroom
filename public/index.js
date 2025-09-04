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
    username,
    text,
  };
  ws.send(JSON.stringify(message));
}

//#region Código de UI

const nombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');
const mensajes = document.getElementById('mensajes');

enviar.onclick = () => {
  const username = nombre.value;
  const text = mensaje.value;
  sendMessage(username, text);
};

function showMessage(msgObj) {
  const article = document.createElement('article');
  mensajes.appendChild(article);
  article.innerHTML = `
    <div class="username">
      ${msgObj.username}
      <span class="time">(${fechaBonita(msgObj.timestamp)})</span>
    </div>
    <div class="message">${msgObj.text}</div>
  `;
}

function fechaBonita(fechaISO) {
  const fecha = new Date(fechaISO);
  const hora = fecha.getHours();
  const minuto = fecha.getMinutes();

  return `${hora}:${minuto}`;
}
