document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById("input");
  const chatlog = document.getElementById("chatlog");
  const sendButton = document.getElementById("send-button");
  
  // Fix for mobile viewport height issues
  function setViewportHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
  setViewportHeight();

  // Focus the input field when the page loads, but not on mobile to prevent keyboard popup
  if (window.innerWidth > 768) {
    input.focus();
  }

  // Scroll to bottom of chat
  function scrollToBottom() {
    setTimeout(() => {
      chatlog.scrollTop = chatlog.scrollHeight;
    }, 10);
  }
  
  // Show loading indicator
  function showTypingIndicator() {
    const div = document.createElement("div");
    div.className = "chat-message chat-message-bot typing-indicator";
    div.innerHTML = `<div class="message-bubble bot-bubble">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>`;
    div.id = "typing-indicator";
    chatlog.appendChild(div);
    scrollToBottom();
    return div;
  }
  
  // Remove typing indicator
  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      chatlog.removeChild(indicator);
    }
  }

  // Function to send the message
  function sendMessage() {
    const msg = input.value.trim();
    if (msg) {
      input.value = "";
      appendUserMessage(msg);
      scrollToBottom();
      
      // Add button animation
      sendButton.classList.add('sending');
      setTimeout(() => sendButton.classList.remove('sending'), 300);
      
      // Show typing indicator
      const typingIndicator = showTypingIndicator();
      
      fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      })
      .then(res => res.json())
      .then(data => {
        removeTypingIndicator();
        appendBotMessage(data.reply);
        scrollToBottom();
      })
      .catch(() => {
        removeTypingIndicator();
        appendBotMessage("Shit's broken, bro. Try again later.");
        scrollToBottom();
      });
      
      input.focus();
    }
  }

  // Send message on Enter key press
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Send message on button click
  sendButton.addEventListener("click", function(e) {
    e.preventDefault();
    sendMessage();
  });

  // Better touch handling for the send button
  sendButton.addEventListener("touchend", function(e) {
    e.preventDefault();
    sendMessage();
  });

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
    div.innerHTML = `<div class="message-bubble user-bubble">${escapeHtml(msg)}</div>`;
    chatlog.appendChild(div);
    scrollToBottom();
  }

  function appendBotMessage(msg) {
    const div = document.createElement("div");
    div.className = "chat-message chat-message-bot";
    div.innerHTML = `<div class="message-bubble bot-bubble">${escapeHtml(msg)}</div>`;
    chatlog.appendChild(div);
    scrollToBottom();
  }
  
  // Prevent XSS attacks
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>");
  }
  
  // Add some CSS to handle typing indicator
  const style = document.createElement('style');
  style.textContent = `
    .typing-indicator .message-bubble {
      padding: 12px 16px;
      min-width: 50px;
    }
    .typing-indicator .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #666;
      margin-right: 4px;
      animation: typingAnimation 1.5s infinite ease-in-out;
    }
    .typing-indicator .dot:nth-child(1) { animation-delay: 0s; }
    .typing-indicator .dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typingAnimation {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }
  `;
  document.head.appendChild(style);
  
  // Prevent bounce scrolling on iOS
  document.addEventListener('touchmove', function(e) {
    if (e.target === document.body || e.target === document.documentElement) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // Show a welcome message
  setTimeout(() => {
    appendBotMessage("What's up? Say something fucking interesting.");
  }, 500);
}); 