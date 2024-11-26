const socket = io();

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

function displayMessage(sender, text, isUserMessage = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  if (isUserMessage) {
    messageDiv.classList.add("user-message");
  } else {
    messageDiv.classList.add("other-message");
  }

  messageDiv.innerHTML = `<span class="sender">${sender}:</span> <span class="message-text">${text}</span>`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    displayMessage("You", message, true);
    socket.emit("chat message", message);
    messageInput.value = "";
  }
});
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});

socket.on("chat message", (msg) => {
  displayMessage("User", msg, false);
});
