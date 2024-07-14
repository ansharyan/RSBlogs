const express = require("express");
const router = express.Router();
const Blog = require("../models/blog.js");
const { isLoggedIn, isAdmin} = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");

const upload = multer({ storage})

router.get("/home", async(req, res) => {
  let allBlogs = await Blog.find();

  res.render("blogs/home.ejs",{allBlogs});
});

// router.get("/show", (req, res) => {
//   res.render("blogs/show.ejs");
// });

// router.get("/firstBlog", async (req, res) => {
//   let allComments = await Comment.find().populate("author");
//   res.render("blogs/firstBlog.ejs", { allComments });
// });

router.get("/newBlog",isLoggedIn,isAdmin ,(req, res) => {
  res.render("blogs/newBlog-form.ejs");
});
router.post("/createBlog",isLoggedIn,isAdmin, upload.single("blog[imgURL]") ,async (req, res) => {
  
  let url = req.file.path;
  let filename = req.file.filename;
  let newBlog = new Blog(req.body.blog);
  newBlog.imgURL = url;
  newBlog.imgFilename = filename;
  await newBlog
    .save()
    .then((blog) => {})
    .catch((err) => {
      console.log(err);
    });

    req.flash("success", "New Blog Posted!");
    res.redirect(`blog/${newBlog._id}`);
});

router.get("/blog/:id",isLoggedIn ,async (req, res) => {
  let id = req.params.id;
  let blog = await Blog.findById(id).populate({path: "comments", populate: {path: "author"}});
  let allBlogs = await Blog.find();
  res.render("blogs/show.ejs", { blog, allBlogs });
});

module.exports = router;
