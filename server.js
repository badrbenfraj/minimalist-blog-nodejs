const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://admin:admin@minimalist-blog-nodejs.ty2qv.mongodb.net/minimalist-blog-nodejs?retryWrites=true&w=majority')
let db = mongoose.connection;

// Check db connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', (error) => {
    console.error('DB Error: ', error);
})

// parse application form url encoded
app.use(express.urlencoded({extended: false}))

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({creationDate: -1})
  res.render("articles/index", { articles: articles });
});

app.use((req, res)=> {
    res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
