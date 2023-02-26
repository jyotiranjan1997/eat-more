const express = require("express");
const Cart = require("./cart.model");
const app = express.Router();

const { CartMiddleWare2 } = require("../../MiddleWare/CartMiddleWare");

app.post("/add", CartMiddleWare2, async (req, res) => {
  let payload = req.body;
  try {
    await Cart.create(payload);
    res.send({ msg: "succesfully card added" });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get("/", CartMiddleWare2, async (req, res) => {
  let {user} = req.body;
  try {
    let Items = await Cart.find({ user});
    res.send({ msg: "success", Items: Items });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.patch("/:cartId", CartMiddleWare2, async (req, res) => {
  const id = req.params.cartId;
  const { quantity } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      { _id: id },
      { quantity: quantity }
    );
    res.status(200).json({msg:"update Successfully"});
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/:cartId", CartMiddleWare2, async (req, res) => {
  
  const id = req.params.cartId;
  if (id === "deleteall") {
    let user = req.body.user;

    try {
      await Cart.deleteMany({ user: user });

      res.send({ msg: "Successfully deleted all" });
      // }
    } catch (e) {
      res.status(404).send(e.message);
    }
    
  } else {
    try {
      await Cart.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "Deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
    
});



module.exports = app;
