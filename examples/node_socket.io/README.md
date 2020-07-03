## Node + Socket.io Demo

### demo 功能

- 聊天室应用，连接通个服务器可互相聊天；
- 对方打字时，提示“XXX 正在输入...”

### 实现

- 渲染聊天页面，用 socket.io 实现通信接口，实现客户端发送消息，服务端广播消息。

###  细节

- 广播消息与发送消息的不同

不同点在于，发布者是否会收到消息，demo中的XXX 正在输入中就是广播的例子，核心api是`socket.brodcast.emit(eventName, data)`
