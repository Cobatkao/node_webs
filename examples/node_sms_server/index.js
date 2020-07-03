const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const Socket = require('socket.io');
const ejs = require('ejs');


const app = express();
const server  = require('http').createServer(app);
const PORT = 4000;

const io = Socket(server);

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const nexmo = new Nexmo({
    apiKey: '97997968',
    apiSecret: 'oB5X97gOAldueIHK'
}, {debug: true});

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    const {number, content} = req.body;
    const from = '8613063080002';
    nexmo.message.sendSms(from, number, content, {type: 'unicode'}, (err, responseData) => {
        if (err) return console.log(err);
        const payload = {
            id: responseData.messages[0]['message-id'],
            number: responseData.messages[0]['to'],
            error: responseData.messages[0]['error-text']
        }
        // 服务器向客户端主动发送请求
        io.emit('sms-status', payload);
    });
})

server.listen(PORT, () => {
    console.log(`服务器正在 ${PORT} 端口上愉快运行...`);
})

io.on('connection', (socket) => { // 回调函数为本次连接的socket实例
    console.log("用户 " + socket.id + " 已建立连接");
    io.on('disconnect', () => {
        console.log("用户 "+socket.id+" 断开连接");
    })
})