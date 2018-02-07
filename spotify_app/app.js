require('dotenv').load();
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const morgan = require("morgan")
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const session = require("cookie-session");
const flash = require("connect-flash")
const passport = require("passport");

app.set("view engine", "ejs");
app.use(morgan("tiny"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(session({secret:process.env.SECRET_KEY}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.get("/", function(req,res){
  res.redirect("/users/login");
});

// send flash messages to all routes
app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});

app.use('/users', userRoutes)

// catch 404 and send to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  let mode = app.get('env');
  if (mode === 'development') {
    console.log(err);
  }
  res.status(err.status || 500);
  return res.render('error', {
    message: err.message,
    // if in development mode print full stack trace
    error: mode === 'development' ? err : {}
  });
});

app.listen(8000, () => console.log("Server is listening on port 8000"));