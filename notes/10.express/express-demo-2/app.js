const express = require('express');
const app = express();

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static('test'));
app.use(express.urlencoded());

app.get('/test', (req, res, next) => {
    res.render('main');
})

app.use((req, res, next) => {
    console.log('hi ----------- hi')
    console.log(req.body);
    next();
})

app.listen(3001, () => {
    console.log('server running successfully!')
})
