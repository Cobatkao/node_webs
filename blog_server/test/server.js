//aim：使用http处理get和post

const path = require("path");
const http = require("http");
const qs = require("querystring");

const hostname = "127.0.0.1";
const port = 8888;

const server = http.createServer(function(req, res) {
  const method = req.method;
  const url = req.url;
  const routePath = url.split("?")[0];
  const query = qs.parse(url.split("?")[1]);

  const resData = {
    method,
    url,
    routePath,
    query
  }

  if (req.method === "GET") {
    console.log("url", url);
    console.log("routePath", routePath);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(resData));
  }

  if (req.method === "POST") {
    console.log("Content-Type", req.headers["content-type"]);
    // 接收数据
    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    })
    req.on("end", () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// http://127.0.0.1:8888/api/blog/update?id=1
// {
//   "method": "POST",
//   "url": "/api/blog/update?id=1",
//   "routePath": "/api/blog/update",
//   "query": {
//       "id": "1"
//   },
//   "postData": "{\n\t\"title\": \"博客标题a\",\n\tcontent: \"呃逆绒内a\"\n}"
// }