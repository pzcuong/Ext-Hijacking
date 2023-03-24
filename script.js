let api = "https://api.openai.com/v1"

// Select the button element
const button = document.getElementById("button")

// Add a click event listener to the button
button.addEventListener('click', sendChat)

// Define the sendChat function
// Define the sendChat function
async function sendChat() {
    try {
      // Prevent the form from submitting  
      event.preventDefault();
      let chat = document.getElementById("chat_message").value;
      await UpdateChat("You", chat);
      document.getElementById("chat_message").value = "";

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.openai.com/v1/chat/completions');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer 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')
      xhr.onload = async() => {
        if (xhr.status === 200) {
          const responseData = JSON.parse(xhr.responseText);
          console.log(responseData);
          let botResponse = responseData.choices[0].message.content
          await UpdateChat("ChatGPT", botResponse);
        } else 
          console.error('Request failed.  Returned status of ' + xhr.status);
      };
      const requestBody = {
        "model": "gpt-3.5-turbo-0301",
        "messages": [{"role": "assistant", "content": chat}]
      };
      xhr.send(JSON.stringify(requestBody));
      
    } catch (err) {
      alert(err);
      UpdateChat("ChatGPT", "Sorry, I'm having trouble understanding you. Please try again.")
    }
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
