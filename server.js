const express = require('express');
const app = express();
const articleRouter = require('./routes/articles')
const port = process.env.PORT || 5000
app.set('view engine', 'ejs');

app.use('/articles', articleRouter);

app.get('/', (req, res)=> {
    res.render('index.ejs');
})

app.listen(port, ()=> {
    console.log(`App listening at http://localhost:${port}`)
})