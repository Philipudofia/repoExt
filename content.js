console.log("Hi, I have been injected whoopie!!!")
let mode = "none";
var recorder = null
function onAccessApproved(stream){
    recorder = new MediaRecorder(stream);

    recorder.start();
    recorder.onstart = function(){
        el.style.display = "flex"
        watchStart();
    }
    recorder.onstop = function(){
        stream.getTracks().forEach(function(track){
            if(track.readyState === "live"){
                track.stop()
            }
        })
        el.style.display = "none"
    }

    recorder.ondataavailable = function(event){
        let recordedBlob  = event.data;
        console.log(recordedBlob)

        // URL.revokeObjectURL(url);
        let id = Date.now()
        const formData = new FormData();
        formData.append('video_file',recordedBlob, "screen-recording.mp4")
        formData.append('title', `untitled_video_${id}`)
        formData.append('description', "screenRecord")
        const endpoint = "https://recordplus.onrender.com/api/record/videos/"
        fetch(endpoint,{
            method:"POST",
            body:formData,
        }).then(res => res.json().then(data => console.log(data)).catch(err => console.log(err)))
        // let url = URL.createObjectURL(recordedBlob);

        let a = document.createElement("a");
        
        a.style.display = "none"
        a.href = `https://redirect-dusky.vercel.app/?title=untitled_video_${id}`;
        a.target = "_blank"
        // a.download = "screen-recording.webm"

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
    }
}

chrome.runtime.onMessage.addListener( (message, sender, sendResponse)=>{

    if(message.action === "request_recording"){
        console.log("requesting recording")
        sendResponse(`processed: ${message.action}`);
        navigator.mediaDevices.getDisplayMedia({
            video: {
                width:9999999999,
                height: 9999999999
            }
        }).then((stream)=>{
            onAccessApproved(stream)
        })  
    }

    if(message.action === "stopvideo"){
        console.log("stopping video");
        sendResponse(`processed: ${message.action}`);
        if(!recorder) return console.log("no recorder")

        recorder.stop();


    }

})


// const receiverMail = document.getElementById('email')
// const videoName = document.getElementById('videoName')
// const videoUrl = document.getElementById('videoUrl')
let [seconds, minutes, hours] = [0,0,0]
let timer = null;
let displayTime = ""
function stopWatch() {
    seconds++
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            hours++;
        }
    }
    displayTime = hours +":"+ minutes +":"+ seconds;
}
function watchStart(){
    if (timer !== null) {
        clearInterval(timer)
    }
    timer = setInterval(stopWatch,1000);
}
const el = document.createElement('div')
el.className = "recorder"
el.style.height = "56px"
el.style.width = "350px"
el.style.display = "none"
el.style.alignItems = "center"
el.style.justifyContent = "space-evenly"
el.style.position = "fixed"
el.style.flexDirection="row"
el.style.bottom = "5%"
el.style.left = "15%"
el.style.background = "rgba(20, 20, 20, 1)"
el.style.borderRadius = "200px"
el.style.color = "white"
const shadowRoot =  el.attachShadow({mode:"open"});
shadowRoot.innerHTML = ` <div style = "width:100%; display:flex; flex-direction:row; align-items:center; justify-content:space-between;">
<p style="padding-left:.6rem; color:white;">${displayTime}</p>
</div>`

const container = document.querySelector('body')
container.appendChild(el)