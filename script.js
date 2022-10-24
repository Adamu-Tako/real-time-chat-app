const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const name = prompt('What is your name?')
appendMessages('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessages (`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessages (`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessages (`${name} disconnected`)
    console.log(`${name}`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('event stopped');
    const message = messageInput.value
    appendMessages (`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''  
})

function appendMessages (messages){
    const messageElement = document.createElement('div')
    messageElement.innerText = messages
    messageContainer.appendChild(messageElement)
}