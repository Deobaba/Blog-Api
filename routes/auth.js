const passport = require("passport");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/user");
const ExpressError = require("../utils/expressError");

require("dotenv").config();

router.post("/signup", async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return next(new ExpressError("user already exist", 400));
    }
    // console.log(req.body)
    const newUser = new User({ email, password, firstname, lastname });
    await newUser.save()
    const payload = { user: newUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie('jwt', token, {httpOnly:true, maxAge: 60 * 60 * 1000});
    res.json({
      success: true,
      message: "User Created",
      user: newUser,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const payload = { user: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie('jwt', token, {httpOnly:true, maxAge: 60 * 60 * 1000});
    res.json({
      success: true,
      message: "logged in successfully",
      user: user,
      token: 'Bearer ' + token,
    });
  } catch (err) {
    next(err);
  }
});

//exports
module.exports = router;
