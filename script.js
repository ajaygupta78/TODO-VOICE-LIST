const taskList =[]
const listElement=document.getElementById("taskList");
const statusText=document.getElementById("status");

//Setup Speech Recognition
const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();
recognition.continuous=false;
recognition.lang='en-US';

recognition.onresult=(event) =>{
    const transcript=event.results[0][0].transcript.toLowerCase();
    statusText.innerText=`Heard: "${transcript}"`;
    if(transcript.startsWith("new list")){
        const taskText=transcript.replace("new list","").trim();
        if(taskText)
            addlist(taskText);
    }
    else if(transcript.startsWith("remove list")){
        const num=parseInt(transcript.split(" ")[2])-1;
        if(!isNaN(num))
            removelist(num);
    }
    else if(transcript.startsWith("mark list")){
        const num=parseInt(transcript.split(" ")[2])-1;
        if(!isNaN(num))
            marklist(num);
    }
}
function addlist(task){
    taskList.push({text:task,done:false});
    renderTasks();
}
function removelist(num){
    if(taskList[num]){
        taskList.splice(num,1);
        renderTasks();
    }
}
function marklist(num){
    if(taskList[num]){
        taskList[num].done=true;
        renderTasks();
    }
}
function renderTasks(){
    listElement.innerHTML="";
    taskList.forEach((task,idx)=>{
        const li=document.createElement("li");
        li.innerText=`${idx+1}. ${task.text} ${task.done ? "✅" : ""}`;
        listElement.appendChild(li);
    });
}


function startVoice(){
    statusText.innerText="Listening...";
    recognition.start();
}

document.getElementById("startBtn").addEventListener("click",startVoice);