function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    const chatContainer = document.querySelector('.chat-container');
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
    const chatMessage = document.getElementById('chatMessage');
    if (chatMessage.value.trim() !== '') {
        fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: chatMessage.value })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                loadMessages();
                chatMessage.value = '';
            }
        });
    }
}

function loadMessages() {
    fetch('/get_messages')
    .then(response => response.json())
    .then(data => {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        data.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}
