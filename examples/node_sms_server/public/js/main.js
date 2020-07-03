const numberInput = document.querySelector('#exampleEmailInput');
const textInput = document.querySelector('#exampleRecipientInput');
const button = document.querySelector('.button-primary');
const response = document.querySelector('.response');

const socket = io.connect("http://localhost:4000");
socket.on('sms-status', (payload) => {
    if (payload.error) {
        response.innerHTML = `<h5>${payload.error}</h5>`;
    } else {
        response.innerHTML = `短信已发送至 ${payload.number}`;
    }
})

function send() {
    const number = 86 + numberInput.value.replace(/\D/g, '');
    const content = textInput.value;
    fetch('/', {
        method: "POST",
        headers: new Headers({
            "Content-type": "application/json"
        }),
        body: JSON.stringify({
            number,
            content
        })
    }).then((res) => {
        console.log('res', res);
    }).catch((error) => {
        console.log(error && error.message);
    });
}

button.addEventListener('click', send, false);