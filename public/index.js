console.log('hello!');

const ws = new WebSocket('/chatroom');

ws.onopen = () => {
  console.log('Connected to the WebSocket server.');
  setText('wsStatus', 'open');
};

ws.onmessage = event => {
  console.log('Message received from server:', event.data);
  addEvent(event.data);
  displayChatMessage(event.data);
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

function sendMessage() {
  const usernameInput = document.getElementById('username');
  const messageInput = document.getElementById('messageInput');
  
  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();
  
  if (!username) {
    alert('Please enter a username');
    return;
  }
  
  if (!text) {
    alert('Please enter a message');
    return;
  }
  
  const message = {
    username: username,
    text: text
  };
  
  ws.send(JSON.stringify(message));
  messageInput.value = '';
}

function displayChatMessage(data) {
  try {
    const message = JSON.parse(data);
    const chatMessages = document.getElementById('chatMessages');
    
    const messageElement = document.createElement('div');
    messageElement.style.marginBottom = '10px';
    messageElement.style.padding = '5px';
    messageElement.style.backgroundColor = '#fff';
    messageElement.style.borderRadius = '3px';
    
    const timestamp = new Date(message.timestamp).toLocaleTimeString();
    messageElement.innerHTML = `
      <strong>${message.username}</strong> 
      <span style="color: #666; font-size: 0.8em;">${timestamp}</span><br>
      ${message.text}
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    console.error('Error parsing chat message:', err);
  }
}

document.getElementById('messageInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
