const secret_key = process.env.secret_key;
var jwt = require("jsonwebtoken");

const CartMiddleWare = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, secret_key, function (err, decoded) {

        if (err) {
            res.status(500).send({msg:"You are Not authrized"})
        }
        if (decoded) {
            req.body.user = decoded.user;
            next();
     }
    });
  


};

const CartMiddleWare2 = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, secret_key, function (err, decoded) {
    if (err) {
      res.status(500).send({ msg: "You are Not authrized" });
    }
    if (decoded) {
      req.body.user = decoded.user._id;
      next();
    }
  });
};
module.exports = { CartMiddleWare, CartMiddleWare2 };
