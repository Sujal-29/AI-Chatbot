const chatBody = document.getElementById('chatBody');
const userInput = document.getElementById('userInput');  
const imagebtn=document.querySelector('.image')
const image=document.querySelector('.image img')
const imageinput=document.querySelector('.image input')


const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAamCk3ubET98nWxuuKf4DatZ7oXSOqtgY"



let user={
  message:null,
  file:{
    mime_type:null,
    data: null
  }
}

async function generateResponse(botMessage){

  let RequestOption={
      method:"POST",
      headers:{
        
        'Content-type':'application/json'},
      body:JSON.stringify({
        "contents":[{"parts":[{"text":user.message},(user.file.data?[{"inline_data":user.file}]:[])
      ]
    }]

      })

  }

  try{
    const response = await fetch(Api_Url,RequestOption);
    const data = await response.json();
    console.log(data);
    let print=data.candidates[0].content.parts[0].text
    // console.log(print)
    botMessage.textContent=print
  }

  catch(error){
    console.error(error);
  }
  finally{
    chatBody.scrollTop = chatBody.scrollHeight;
    image.src=`image-02-solid-rounded.svg`
    image.classList.remove("choose")
    user.file={}
  }

  let response=fetch(Api_Url,RequestOption)
}




async function handlecheckbox(userMessage){
    user.message=userMessage
       
      let msg=document.createElement('div')
        // msg.innerHTML=html
        msg.classList.add('user-message','message')
        msg.innerHTML = user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>` : "";
        msg.insertAdjacentText('afterbegin', userMessage); // This will add the user message before the image

         chatBody.appendChild(msg); 
        //  console.log(msg)
  

         setTimeout(() => {
            const botMessage=document.createElement('div')
            botMessage.classList.add('bot-message','message')
            // botMessage.textContent=responseText
            chatBody.appendChild(botMessage)
            generateResponse(botMessage)
          }, 1000);
  
  
   }
  
  
  button.addEventListener("click", ()=>{
    
    handlecheckbox(userInput.value.trim())
    userInput.value="";
    
  })  

  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handlecheckbox(userInput.value.trim());
        userInput.value = "";
    }
});
  
  imageinput.addEventListener("change",()=>{
    const file = imageinput.files[0];
    if(!file) return;
    const reader = new FileReader();  //read file
    reader.onload = (e) => {
      // const fileURL = e.target.result;
      console.log(e);
      let base64string=e.target.result.split(',')[1]
      user.file={
      mime_type:file.type,
      data:base64string
      }
      image.src= `data:${user.file.mime_type};base64,${user.file.data}`
      image.classList.add("choose")
    }
    reader.readAsDataURL(file)

  })


  imagebtn.addEventListener("click",()=>{
    imagebtn.querySelector('input').click()
  }

  )
