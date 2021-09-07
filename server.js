const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articleRouter = require("./routes/articles");
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://admin:admin@minimalist-blog-nodejs.ty2qv.mongodb.net/minimalist-blog-nodejs?retryWrites=true&w=majority')

app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "blog1",
      creationDate: new Date(),
      description:
        "description description description description description description description description description description description ",
    },
    {
      title: "blog2",
      creationDate: new Date(),
      description:
        "description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 ",
    },
    {
      title: "blog3",
      creationDate: new Date(),
      description:
        "description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 ",
    },
    {
      title: "blog4",
      creationDate: new Date(),
      description:
        "description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 ",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
