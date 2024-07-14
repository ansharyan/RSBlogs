const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

//login
router.get("/login",(req, res) => {
  res.render("user/login.ejs");
});
router.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome Back!!");
    let redirectURl = res.locals.redirectUrl || "blogs/home"; 
    res.redirect(redirectURl);
  }
);

//signup
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
  let { firstName, lastName, email, username, password } = req.body;
  let newUser = new User({ firstName, lastName, email, username });
  let registeredUser = await User.register(newUser, password).then(()=>{
    req.flash(`Welcome, ${newUser.username}`)
  }).catch((err) =>{
    req.flash("error", err);
    res.redirect("/login");
  })
  res.redirect("/login");
});


//logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/blogs/home");
});

module.exports = router;
