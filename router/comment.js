const express = require("express");
const router = express.Router({mergeParams:true});

const Comment = require("../models/comment.js");
const Blog = require("../models/blog.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");


//newComment
router.post("/newcomment",isLoggedIn ,async (req, res) => {
  let { remarks } = req.body;
  let blog =  await Blog.findById(req.params.blogId);
  let author = req.user._id;
  let newComment = new Comment({ remarks, author });
  blog.comments.push(newComment);
  await newComment.save();
  await blog.save();
  req.flash("success", "Comment Added!");
  res.redirect(`/blogs/blog/${blog._id}`);
});

//delete comment
router.delete("/delete/:id",isLoggedIn,isAuthor ,async (req, res) => {
  let {blogId, id} = req.params;
  
    await Blog.findByIdAndUpdate(blogId, {$pull : {comments: id}});
    await Comment.findByIdAndDelete(comment._id);

  req.flash("error", "Comment Deleted!");
  res.redirect(`/blogs/blog/${blogId}`);
});

module.exports = router;
