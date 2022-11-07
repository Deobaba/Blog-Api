const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require("../src/models/user");
const ExpressError = require("../utils/expressError");


const addUserToRequestBody = (req,res,next) =>{
    const token = req.cookies.jwt
    if(token){
        //verify with jwt
        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken)=>{
            if(err){
                return next(new ExpressError('invalid token', 401))
            }else{
                const id = decodedToken.user;
                const user = await User.findById(id);
                req.user = user
                next()
            }
        })
    }else{
        next()
    }
}

module.exports = addUserToRequestBody;