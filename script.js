const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');  
const button = document.getElementById('button');
const imagebtn = document.querySelector('.image');
const image = document.querySelector('.image img');
const imageinput = document.querySelector('.image input');


const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY";



let user = {
  message: null,
  file: {
    mime_type: null,
    data: null
  }
};

async function generateResponse(botMessage) {
  const parts = [{ text: user.message }];

  if (user.file?.data) {
    parts.push({ inline_data: user.file });
  }

  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts }]
    })
  };

  try {
    const response = await fetch(API_URL, requestOption);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "API request failed");
    }

    const print = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    botMessage.textContent = print || "No response received from API.";
  } catch (error) {
    console.error(error);
    botMessage.textContent = "API error: check your API URL/key and model access.";
  } finally {
    chatBody.scrollTop = chatBody.scrollHeight;
    image.src = "image-02-solid-rounded.svg";
    image.classList.remove("choose");
    user.file = { mime_type: null, data: null };
  }
}




async function handlecheckbox(userMessage) {
  if (!userMessage && !user.file?.data) {
    return;
  }

  user.message = userMessage || "Describe this image.";

  const msg = document.createElement('div');
  msg.classList.add('user-message', 'message');
  msg.innerHTML = user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>` : "";
  msg.insertAdjacentText('afterbegin', userMessage || "[Image uploaded]");

  chatBody.appendChild(msg);

  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message', 'message');
    chatBody.appendChild(botMessage);
    generateResponse(botMessage);
  }, 300);
}
  
  
button.addEventListener("click", () => {
  handlecheckbox(userInput.value.trim());
  userInput.value = "";
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handlecheckbox(userInput.value.trim());
    userInput.value = "";
  }
});
  
imageinput.addEventListener("change", () => {
  const file = imageinput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64string = e.target.result.split(',')[1];
    user.file = {
      mime_type: file.type,
      data: base64string
    };
    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");
  };
  reader.readAsDataURL(file);

  imageinput.value = "";
});

imagebtn.addEventListener("click", () => {
  imagebtn.querySelector('input').click();
});
