const Comment = require("./models/comment.js");
const Blog = require("./models/blog.js");


module.exports.isLoggedIn = (req,res, next) => {
    if(!req.user){
        req.flash("error", "Login to continue");
        req.session.redirectUrl = req.originalUrl;
       return res.redirect("/login");
    }
    next();    
}

module.exports.saveRedirectUrl = (req,res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    let {blogId, id} = req.params;
     let comment = await Comment.findById(id);
     if (!req.user._id.equals(comment.author)){
        req.flash("error", "You are not author of this comment!");
        res.redirect(`/blogs/blog/${blogId}`);
     }
     next();
}

module.exports.isAdmin = async(req, res, next) => {
    if(!(req.user.username === "ansh")){
        req.flash("error", "You are not allowed!!");
    res.redirect("/blogs/home");
    }
    next();
}


module.exports.uploadImage = async (req, res, next) => {

}

