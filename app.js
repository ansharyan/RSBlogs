if(process.env.NODE_ENV != "production"){
  require('dotenv').config(); 
}

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require("path");
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");  
const User = require("./models/user.js");


const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");


const blogRouter = require("./router/blog.js");
const commentRouter = require("./router/comment.js");
const userRouter = require("./router/user.js");

// let dbURL = 'mongodb://127.0.0.1:27017/blog';
let dbURL = process.env.MONGODB_URL;

let port = 8080;

main()
  .then(() =>{
    console.log("Connected!!");
  }).catch((err) =>{
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs", ejsMate)
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect(dbURL);
}


const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
}); 

store.on("error", () =>{
   console.log("Error in Mongo Session Store", err);
});
const sessionOptions ={
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
  }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})


app.use("/blogs", blogRouter);
app.use("/blogs/:blogId/comments", commentRouter);
app.use("/", userRouter);

app.get("/", (req,res) => {
  res.redirect("/blogs/home");
});

//Page not Found
app.all("*",(req,res,next) => {
  req.flash("error", "Page Not Found!");
  res.redirect("/blogs/home");
})

app.listen(port, () => {
    console.log("App is Listening");
})
