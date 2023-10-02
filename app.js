const toggleBtns = document.querySelectorAll('.toggleBtn')
let camera = true;
let audio = true;

toggleBtns.forEach((btn)=>{
    btn.addEventListener('click', function(){
        if (btn.classList.contains('camera')) {
            btn.classList.toggle('toggleBtnActive')
            if (btn.classList.contains('toggleBtnActive')) {
                camera = false
            }else{
                camera = true
            }
        }else {
            btn.classList.toggle('toggleBtnActive')
            if (btn.classList.contains('toggleBtnActive')) {
                audio = false
            }else{
                audio = true
            }
        }
    })
})

const currentTab = document.querySelector('.currentTab')
const fullScreen = document.querySelector('.fullScreen')
let isCurrentTab = false;
let isFullScreen = true;

fullScreen.addEventListener('click', function(){
    isFullScreen = true;
    isCurrentTab = false;
    fullScreen.classList.add('tabsActive')
    currentTab.classList.remove('tabsActive')
})
currentTab.addEventListener('click', function(){
    isFullScreen = false
    isCurrentTab = true;
    fullScreen.classList.remove('tabsActive')
    currentTab.classList.add('tabsActive')
})

const closeBtn =document.querySelector('.close')
const settingsBtn =document.querySelector('.settings')
const playBtn = document.querySelector('.playBtn')
const stopBtn = document.querySelector('.stopBtn')
const micBtn = document.querySelector('.micBtn')
const camerBtn = document.querySelector('.cameraBtn')
const deleteBtn = document.querySelector('.deleteBtn')
const timeStamp = document.querySelector('.timeStamp')

document.addEventListener("DOMContentLoaded", ()=>{
    // GET THE SELECTORS OF THE BUTTONS
    const startRecordBtn =document.querySelector('.startRecording')
    const stopRecordBtn =document.querySelector('.stopRecording')

    // adding event listeners

    startRecordBtn.addEventListener("click", ()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "request_recording"},  function(response){
                if(!chrome.runtime.lastError){
                    console.log(response)
                } else{
                    console.log(chrome.runtime.lastError, 'error line 14')
                }
            })
        } )
    })


    stopRecordBtn.addEventListener("click", ()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "stopvideo"},  function(response){
                if(!chrome.runtime.lastError){
                    console.log(response)
                } else{
                    console.log(chrome.runtime.lastError, 'error line 27')
                }
            })
        } )
    })
})
