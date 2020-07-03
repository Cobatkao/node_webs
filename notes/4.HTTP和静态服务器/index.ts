import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as p from 'path';
import * as fs from "fs";
import * as url from 'url';

let server = http.createServer();
let publicPath = p.resolve(__dirname, 'public');

server.on('request', (req: IncomingMessage, res: ServerResponse) => {
    const {method, headers, url: path} = req;
    const {pathname, search, query} = url.parse(path);
    // switch (pathname) {
    //     case '/index.html':
    //         res.setHeader('content-type', 'text/html; charset=utf-8');
    //         fs.readFile(p.resolve(publicPath, 'index.html'), (err, data) => {
    //             if (err) throw err;
    //             res.end(data.toString());
    //         })
    //         break;
    //     case '/style.css':
    //         res.setHeader('content-type', 'text/css');
    //         fs.readFile(p.resolve(publicPath, 'style.css'), (err, data) => {
    //             if (err) throw err;
    //             res.end(data.toString());
    //         })
    //         break;
    //     case '/main.js':
    //         res.setHeader('content-type', 'text/javascript');
    //         fs.readFile(p.resolve(publicPath, 'main.js'), (err, data) => {
    //             if (err) throw err;
    //             res.end(data.toString());
    //         })
    //         break;
    // }

    // 处理所有文件
    let filename = pathname.substr(1);
    filename === '' ? filename = 'index.html' : undefined; // 若路径为空 则首页为index.html
    fs.readFile(p.resolve(publicPath, filename), (err, data) => {
        if (err) {
            if (err.errno === -4058) {
                fs.readFile(p.resolve(publicPath, '404.html'), (err, data) => {
                    if (err) throw err;
                    res.end(data);
                })
                res.statusCode = 404;
                res.end('你所请求的文件不存在！');
            } else if (err.errno === -4068) {
                res.statusCode = 403;
                res.end('无权访问目录');
            } else {
                res.statusCode = 500;
                res.end('服务器内部错误');
            }
        } else {
            res.end(data);
        }
    })

    // 处理不存在的文件（返回一个404页面）



    // const array = [];
    // req.on('data', (chunk) => {
    //     array.push(chunk);
    // })
    // req.on('end', () => {
    //     let result = Buffer.concat(array).toString();
    //     console.log('请求体为：', result);
    //     res.end('hello world');
    // })
})

server.listen('8888', () => {
    console.log('server is running at port 8888');
});