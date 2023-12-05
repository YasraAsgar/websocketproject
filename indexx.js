document.addEventListener("DOMContentLoaded", function () {
    // Your WebSocket connection
    const socket = new WebSocket('ws://localhost:6001');
  
    // DOM elements
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatButton = document.getElementById('sendChat');
  
    // Event listener for the WebSocket connection open
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened:', event);
    });
  
    // Event listener for the WebSocket connection close
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event);
    });
  
    // Event listener for receiving messages from the server
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log('Received:', message);
  
      // Append the message to the chatMessages list
      const listItem = document.createElement('li');
      listItem.textContent = `${message.sender}: ${message.text}`;
      chatMessages.appendChild(listItem);
    });
  
    // Event listener for sending chat messages
    sendChatButton.addEventListener('click', () => {
      const message = {
        sender: 'You', // Add the sender information (can be dynamic based on user input)
        text: chatInput.value,
      };
  
      // Send the message to the server
      socket.send(JSON.stringify(message));
  
      // Append the sent message to the chatMessages list
      const listItem = document.createElement('li');
      listItem.textContent = `${message.sender}: ${message.text}`;
      chatMessages.appendChild(listItem);
  
      // Clear the chat input
      chatInput.value = '';
    });
  });
  
