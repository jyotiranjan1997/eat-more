const secret_key = process.env.secret_key;
var jwt = require("jsonwebtoken");

const CartMiddleWare = (req, res, next) => {

    const token = req.headers.authorization;
    if (token) {
        req.body.user = token;
        next()
    } else {
        res.status(500).send({msg:"You are Not authrized"})
   }


};
module.exports={CartMiddleWare}
