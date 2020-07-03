## node + multer 实现文件上传

- 技术点：基于express，开源package：multer实现单图，多图上传，图片直接保存在本地；
- 细节：
    1. 获取上传的图片的信息。
    2. 进阶使用：自定义保存的图片路径、名称。
    
## 依赖安装

```node
yarn add express multer
```

### 实现

#### 单图上传

```html
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="avatar" />
        <input type="submit" value="Get me the stats!">
    </form>
</body>
```

```javascript
const express = require("express");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(express.static('./'));

app.post('/upload', upload.single('avatar'), (req, res, next) => {
    console.log('req.file', req.file);
    console.log('req.body', req.body);
    res.send('你好！');
})

app.listen(4000, () => {
    console.log('服务在400端口上愉快的运行着...');
})
```

multer会将文件的信息写到 req.file 上，`req.file`与`req.body`的打印信息如下：

![截屏2020-06-23 下午6.01.15.png](https://i.loli.net/2020/06/23/No8xSkhliGQ1avB.png)

选择图片，点击“提交”，done。然后，你就会看到 upload 目录下多了个图片。