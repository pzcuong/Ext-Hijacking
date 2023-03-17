let api = "https://api.openai.com/v1"

// Select the button element
const button = document.getElementById("button")

// Add a click event listener to the button
button.addEventListener('click', sendChat)

// Define the sendChat function
// Define the sendChat function
async function sendChat() {
    // Prevent the form from submitting
    event.preventDefault();
  
    let chat = document.getElementById("chat_message").value;
    UpdateChat("You", chat);
    document.getElementById("chat_message").value = "";

    let res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": chat}]
      })
    });  

    res = await res.json();
    let botResponse = res.choices[0].message.content
    UpdateChat("Bot", botResponse);
}  

async function UpdateChat(sender, message) {
    // Get the chat element
    const chat_value = document.querySelector('.chat');

    // Create a new message element
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `
        <div class="sender">${sender}</div>
        <div class="text">${message}</div>
    `;

    // Append the new message element to the chat
    chat_value.appendChild(newMessage);
}
