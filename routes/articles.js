const { render } = require("ejs");
const express = require("express");
const article = require("../models/article");
const Article = require("../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
    let article = await Article.findOne({slug: req.params.slug});
    if (article == null) res.redirect('/');
    res.render('articles/article_details', {article: article});
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    res.render("articles/new", { article: article });
  }
});

router.get("/:slug/edit", async (req, res) => {
  let article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  res.render("articles/edit", { article: article });
});

router.post('/:slug/edit', async (req, res) => {
  let article = {};
  article = {
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    updateDate: new Date()
  };
  try {
    await Article.updateOne({slug: req.params.slug}, article);
    res.redirect(`/articles/${req.params.slug}`);
  } catch (error) {
    console.log(error);
  }

});

router.delete('/:slug', async (req, res) => {
  try {
    let article = await Article.findOne({slug: req.params.slug});
    Article.deleteOne(article, function(){
      res.status(200).redirect('/');
    });
    
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
