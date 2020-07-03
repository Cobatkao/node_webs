// 初次执行文件
const http = require("http");

const PORT = 8000;
const initServer = require("../app");
const server = http.createServer(initServer);

server.listen(PORT);