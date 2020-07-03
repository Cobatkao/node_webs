// const moment = require("moment");
const socket = io.connect("http://localhost:4000");

const handle = document.querySelector("#handle");
const message = document.querySelector("#message");
const output = document.querySelector("#output");
const send = document.querySelector("#send");
const feedback = document.querySelector("#feedback");

send.addEventListener('click', function () {
    if (!message.value) return alert('消息不能为空');
    socket.emit('chat', {
        handle: handle.value,
        message: message.value,
        send_at: (new Date()).toLocaleTimeString()
    })
    handle.value = '';
    message.value = '';
})

message.addEventListener('keydown', function () {
    socket.emit('typing', {
        status: `${handle.value} 正在输入中...`
    })
})

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p class="chat-message"><strong>${data.handle}：${data.message}</strong><span class="time">${data.send_at}</span></p>`
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p class="type-status">${data.status}</p>`;
})