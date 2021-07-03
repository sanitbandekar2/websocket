const socket = io()
const total = document.getElementById('client-total')
const msgcontainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const msgForm =document.getElementById('message-form')
const msgInput = document.getElementById('message-input')

msgForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    sendMsg()
})

function sendMsg() {
    console.log(msgInput.value)

    const data = {
        name: nameInput.value,
        message:msgInput.value,
        dateTime: new Date(),
    }
    socket.emit('message',data)
}

socket.on('chat-msg',(data) =>{
    console.log(data)
    socket.broadcast.emit('chat-msg')
})
socket.on('client-total',(data) =>{
    console.log(data)
    total.innerText = `total ${data}`
})