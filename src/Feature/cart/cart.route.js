const express = require("express");
const Cart = require("./cart.model");
const app = express.Router();
const User = require("../user/user.model");

app.post("/", async (req, res) => {
  let user = req.body;
  try {
    let Items = await Cart.find(user);
    res.send(Items);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
app.post("/add", async (req, res) => {
  let user = req.body;
  console.log(user)
  try {
    let Items = await Cart.insertMany([user]);
    console.log("sucess")
    res.send(Items);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post("/update", async (req, res) => {
  let user = req.body;
  try {
    let Items = await Cart.findByIdAndUpdate(user);
    res.send({"msg":"updated successully"});
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.delete("/delete", async (req, res) => {
  let user=req.body
  try {
    let cart = await Cart.findByIdAndDelete(user);

    res.send({"msg":"Successfully removed"} );
    // }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.delete("/deleteall", async (req, res) => {
  let user = req.body;
  try {
    let cart = await Cart.deleteMany(user);

    res.send({ msg: "Successfully ordered" });
    // }
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = app;
