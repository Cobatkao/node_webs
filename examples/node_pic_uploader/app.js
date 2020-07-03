const express = require("express");
const multer = require("multer");
const p = require("path");
const fs = require("fs");
const ejs = require("ejs");

const app = express();

const customUploadDest = './public/';

function handleFolder(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

function checkFileType(file, cb) {
    const valideFileType= /jpeg|png|gif|jpg/;
    const extname = valideFileType.test(p.extname(file.originalname).toLowerCase());
    const mineType = valideFileType.test(file.mimetype.split('/')[1]);
    if (extname && mineType) {
        return cb(null, true);
    }
    return cb('错误：只支持jpeg|png|gif|jpg等格式');
}

handleFolder(customUploadDest);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, customUploadDest);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + p.extname(file.originalname));
    }
});

const uploader = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    },
    limits: {
        fileSize: 1000000
    }
    }
    ).single('avatar');

app.set('view engine', 'ejs');

//创建一个虚拟的文件前缀
app.use('/static', express.static(p.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {status: '空'});
})

app.post('/upload', (req, res) => {
    uploader(req, res, (err) => {
        console.log(req.file);
        if (err) return res.render('index', {
            msg: err
        })
        if (!req.file) {
            res.render('index', {
                msg: '错误：请选择上传文件！',
            })
        } else {
            res.render('index', {
                msg: '文件已上传成功！',
                file: `static/${req.file.filename}`
            })
        }
    })
})

app.get('/form', function(req, res, next){
    const content = fs.readFileSync(p.join(__dirname, 'views', 'index.ejs'), {encoding: 'utf8'});
    res.send(content);
});

app.listen(4000, () => {
    console.log('服务在4000端口上愉快的运行着...');
})