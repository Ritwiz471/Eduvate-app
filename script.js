//client side js
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')

const messageInput = document.getElementById('message-input')

const personName = prompt('What is your name?')
appendMessage('You joined')

socket.emit('new-user', personName)


socket.on('chat-message', data => {
    appendMessage(`${data.personName}: ${data.message}`)
})

socket.on('user-connected', personName => {
    appendMessage(`${personName} connected`)
})
socket.on('user-disconnected', personName => {
    appendMessage(`${personName} disconnected`)
})


messageForm.addEventListener('submit' , e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value =''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}