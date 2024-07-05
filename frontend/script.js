document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const messagesContainer = document.getElementById("messages");
    // Function to send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;
        // Add user message to chat
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("message", "user-message");
        userMessageElement.innerText = message;
        messagesContainer.appendChild(userMessageElement);
        // Clear the input
        userInput.value = "";
        // Send the message to the backend
        fetch("http://127.0.0.1:8000/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Add bot response to chat
            const botMessageElement = document.createElement("div");
            botMessageElement.classList.add("message", "bot-message");
            botMessageElement.innerText = data.response;
            messagesContainer.appendChild(botMessageElement);
            // Scroll to the bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
    // Send message when clicking the send button
    sendButton.addEventListener("click", sendMessage);
    // Send message when pressing the Enter key
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});