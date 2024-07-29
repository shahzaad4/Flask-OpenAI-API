"use strict";

function toggleChat() {
  var chatBody = document.getElementById('chatBody');
  var chatContainer = document.querySelector('.chat-container');

  if (chatBody.style.display === 'none' || chatBody.style.display === '') {
    chatBody.style.display = 'flex';
    chatContainer.style.transform = 'translateY(0)';
    loadMessages();
  } else {
    chatBody.style.display = 'none';
    chatContainer.style.transform = 'translateY(100%)';
  }
}

function sendMessage() {
  var chatMessage = document.getElementById('chatMessage');

  if (chatMessage.value.trim() !== '') {
    fetch('/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: chatMessage.value
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.status === 'success') {
        loadMessages();
        chatMessage.value = '';
      }
    });
  }
}

function loadMessages() {
  fetch('/get_messages').then(function (response) {
    return response.json();
  }).then(function (data) {
    var messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    data.forEach(function (message) {
      var messageElement = document.createElement('div');
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}