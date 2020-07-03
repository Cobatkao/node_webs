var express = require('express')
var app = express()
var fs = require('fs')

var bodyParser = require('body-parser')
var multer = require('multer')

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(multer({ dest: 'uploads/' }).array('image'))
// dest 上传后的文件存储在哪里

app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/' + 'index.html')
})

app.post('/file_upload', function(req, res) {
  console.log(req.files[0]) // 上传的文件信息

  // { fieldname: 'image',
  // originalname: 'Screen Shot 2019-04-23 at 4.18.03 PM.png',
  // encoding: '7bit',
  // mimetype: 'image/png',
  // destination: '/tmp/',
  // filename: 'd46333998cc959b9333103f7224f14d9',
  // path: '/tmp/d46333998cc959b9333103f7224f14d9',
  // size: 30964 }

  var des_file = __dirname + '/' + req.files[0].originalname
  console.log('des_file---', des_file) 
  // /Users/apple/Documents/code/node_blog_server/0.practice/express_test/Screen Shot 2019-04-23 at 4.18.03 PM.png
  fs.readFile(req.files[0].path, function(err, data) {
    fs.writeFile(des_file, data, function(err) {
      if (err) {
        console.log(err)
      } else {
        response = {
          message: 'File uploaded successfully',
          filename: req.files[0].originalname
        }
      }
      console.log(response)
      // { 
      //   message: 'File uploaded successfully',
      //   filename: 'Screen Shot 2019-04-23 at 4.18.03 PM.png' 
      // }
      res.end(JSON.stringify(response))
    })
  })
})

var server = app.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
