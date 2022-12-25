const secret_key = process.env.secret_key;
var jwt = require("jsonwebtoken");

const CartMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
   
jwt.verify(token, secret_key, function (err, decoded) {
    if (err) {
         res.status(201).send({msg:"failed"})
    }
    if (decoded) {
        req.body.user = decoded.id;
        next()
    }
});


};
module.exports={CartMiddleWare}
