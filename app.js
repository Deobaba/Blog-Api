const express = require("express");
const User = require("./models/user");
const Blog = require("./models/blog");
const cookieParser = require('cookie-parser')
const ExpressError = require("./utils/expressError");
const catchAsync = require("./utils/catchAsync");
const blogRoutes = require('./routes/blogs')
const homeRoutes = require('./routes/home')
const authRouter = require('./routes/auth');
const passport = require("passport");
const addUserToRequestBody = require('./utils/confirmUser');

require('./authentication/auth')

const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize())

//routes
app.use(addUserToRequestBody);
app.use('/home',homeRoutes)
app.use('/', authRouter)
app.use('/blog',passport.authenticate('jwt', {session:false}), blogRoutes)

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 401));
});

const handleValidationErr = (err) => {
  return new ExpressError(`Validation Failed...${err.message}`, 400);
};

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") err = handleValidationErr(err);
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err)
  const { status = 500, message = "something went wrong" } = err;
  res.status(status).send(message);
});

//export app
module.exports = app
