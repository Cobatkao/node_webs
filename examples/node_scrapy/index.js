const express = require('express');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const request = require('request');

const app = express()

// 日志中间件
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

request('https://mianbaoduo.com/o/explore', (err, res, html) => {
    const $ = cheerio.load(html);
})

app.get('/', function (req, res) {
    res.send('hello, world!')
});

app.listen(8888, () => {
    console.log('愉快的监听着8888端口...')
});