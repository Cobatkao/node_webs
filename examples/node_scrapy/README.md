## node + cheerio抓取页面内容

### 细节

#### cheerio

cheerio是一个简洁版的jquery实现，主要用在服务端需要对DOM进行操作的场景。它的api和jquery相似，因此会
jquery就会使用cheerio。

#### request

request模块，当在node中调用其他系统接口或进行一些交互时，所能采用的一种http/https请求方式。简单的使用例子如下：

```
const request = require('request')
request('https://www.baidu.com/', function (err, response, body) {
  /*
    response 响应信息的集合
  */
  if (!err && response.statusCode == 200) { 
    console.log(body)
  }
})
```

同样支持stream操作，如下一个 request 结合 pipe 重定向文件流的实例。

```
request('https://www.jmjc.tech/public/home/img/flower.png').pipe(fs.createWriteStream('./flower.png')) // 下载文件到本地
```