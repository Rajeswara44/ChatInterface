// DOM elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Load previous messages from localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  chatbox.innerHTML = '';
  messages.forEach(msg => {
    addMessage(msg.text, msg.sender);
  });
}

// Add a message to the chatbox and localStorage
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = text;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to latest message

  // Save to localStorage
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push({ text, sender });
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Simulate a bot reply
function getBotReply(userMessage) {
  const replies = [
    "Interesting! Tell me more.",
    "I see. What else is on your mind?",
    "Thanks for sharing!",
    "How does that make you feel?",
    "I’m listening..."
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Send message on button click
sendBtn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (text) {
    addMessage(text, 'user');
    userInput.value = '';

    // Simulate bot reply after a short delay
    setTimeout(() => {
      const botReply = getBotReply(text);
      addMessage(botReply, 'bot');
    }, 500);
  }
});

// Send message on Enter key
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

// Load past messages when page loads
window.addEventListener('load', loadMessages);
