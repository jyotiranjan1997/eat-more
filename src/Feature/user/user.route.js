const express = require("express");
const User = require("./user.model");
const app = express.Router();
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {CartMiddleWare}=require("../../MiddleWare/CartMiddleWare")
const secret_key = process.env.secret_key;

app.post("/login", async (req, res) => {
  const { mobile } = req.body;
  try {
    let user = await User.findOne({ mobile });

    if (user) {
      var token = jwt.sign({ id: user.id }, secret_key);

      res.send({
        token: token,
      });
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.post("/singleuser",CartMiddleWare, async (req, res) => {
  const  id  = req.body.user;
  try {
    let user = await User.findOne({ id });

    if (user) {
      res.send({user:user})
    }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    let existingUser = await User.findOne({ mobile });
    // if (existingUser) {
    //   res.status(404).send("Cannot create an user with existing email");
    // } else {
    let user = await User.create({
      name,
      email,
      mobile,
    });

    res.send({ token: `${user.id}` });
    // }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = app;
