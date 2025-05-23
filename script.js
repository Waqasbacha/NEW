const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const minimizeBtn = document.getElementById('minimize-btn');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

chatToggle.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
});

minimizeBtn.addEventListener('click', () => {
  chatContainer.style.display = 'none';
});

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  userInput.value = '';
  setTimeout(() => {
    const response = getBotResponse(message);
    appendMessage('bot', response);
  }, 500);
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
  message = message.toLowerCase();

  const patterns = [
    { regex: /hi|hello|hey/, response: "Hello! How can I assist you today?" },
    { regex: /how are you/, response: "I'm just a bot, but I'm doing great!" },
    { regex: /help/, response: "Sure, I'm here to help! What do you need assistance with?" },
    { regex: /bye|goodbye/, response: "Goodbye! Have a wonderful day!" },
    { regex: /your name/, response: "I'm your friendly chatbot!" },
  ];

  for (let pattern of patterns) {
    if (pattern.regex.test(message)) {
      return pattern.response;
    }
  }

  return "I'm sorry, I didn't understand that. Can you please rephrase?";
}

// Initialize chat as hidden
chatContainer.style.display = 'none';
