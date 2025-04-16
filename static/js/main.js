document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById("input");
  const chatlog = document.getElementById("chatlog");
  const sendButton = document.getElementById("send-button");

  // Focus the input field when the page loads
  input.focus();

  // Function to send the message
  function sendMessage() {
    const msg = input.value.trim();
    if (msg) {
      appendUserMessage(msg);
      
      // Add button animation
      sendButton.classList.add('sending');
      setTimeout(() => sendButton.classList.remove('sending'), 300);
      
      fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      })
      .then(res => res.json())
      .then(data => appendBotMessage(data.reply))
      .catch(() => appendBotMessage("Shit's broken, bro."));
      
      input.value = "";
      input.focus();
    }
  }

  // Send message on Enter key press
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Send message on button click
  sendButton.addEventListener("click", sendMessage);

  // Toggle send button visibility based on input content
  input.addEventListener("input", function() {
    if (input.value.trim()) {
      sendButton.style.opacity = "1";
    } else {
      sendButton.style.opacity = "0.7";
    }
  });

  function appendUserMessage(msg) {
    const div = document.createElement("div");
    div.className = "chat-message chat-message-user";
    div.innerHTML = `<div class="message-bubble user-bubble">${msg}</div>`;
    chatlog.appendChild(div);
    chatlog.scrollTop = chatlog.scrollHeight;
  }

  function appendBotMessage(msg) {
    const div = document.createElement("div");
    div.className = "chat-message chat-message-bot";
    div.innerHTML = `<div class="message-bubble bot-bubble">${msg}</div>`;
    chatlog.appendChild(div);
    chatlog.scrollTop = chatlog.scrollHeight;
  }
}); 