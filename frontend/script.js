document.addEventListener("DOMContentLoaded", function() {
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");
    const messagesContainer = document.getElementById("messages");
    const buttonsContainer = document.getElementById("buttons-container");

    // Function to send message
    function sendMessage(messageText) {
        const message = messageText || userInput.value.trim();
        if (message === "") return;

        // Add user message to chat
        addUserMessage(message);

        // Clear the input
        if (!messageText) {
            userInput.value = "";
        }

        // Send the message to the backend
        fetch("http://127.0.0.1:8000/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => handleBotResponse(data))
        .catch(error => {
            console.error("Error:", error);
        });
    }

    // Function to handle bot response
    function handleBotResponse(data) {
        // Add bot response to chat
        addBotMessage(data.response);

        // If the response requires issue specification, show buttons
        if (data.response.includes("Can you tell me what is the issue that you are facing:")) {
            showIssueButtons();
        } else {
            buttonsContainer.innerHTML = ""; // Clear buttons if not needed
        }
    }

    // Function to add user message
    function addUserMessage(message) {
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("message", "user-message");
        userMessageElement.innerText = message;
        messagesContainer.appendChild(userMessageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Function to add bot message
    function addBotMessage(message) {
        const botMessageElement = document.createElement("div");
        botMessageElement.classList.add("message", "bot-message");
        botMessageElement.innerText = message;
        messagesContainer.appendChild(botMessageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Function to show issue buttons
    function showIssueButtons() {
        buttonsContainer.innerHTML = ""; // Clear any existing buttons

        const emptyQueueButton = document.createElement("button");
        emptyQueueButton.innerText = "Empty Queue Issue";
        emptyQueueButton.onclick = () => sendMessage("Empty Queue Issue");

        const platformIssueButton = document.createElement("button");
        platformIssueButton.innerText = "Platform Issue";
        platformIssueButton.onclick = () => sendMessage("Platform Issue");

        buttonsContainer.appendChild(emptyQueueButton);
        buttonsContainer.appendChild(platformIssueButton);
    }

    // Send message when clicking the send button
    sendButton.addEventListener("click", () => sendMessage());

    // Send message when pressing the Enter key
    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
