const jwt = require("jsonwebtoken")
const { userTypes } = require("../utils/constants")
const User = require("../Models/user.models")
const { SECRET } = require("../configs/auth.config")

const verifyToken = (req, res, next)=>{
    
    let token = req.headers['x-access-token']  // access token from request headers
    if(!token){
        return res.status(401).send({message:"User not authenticated"})
    }
    jwt.verify(token,SECRET, async (err, payload)=>{ 
        if(err){
            return res.status(403).send({message:"Token is invalid"})
        }
        const userId = payload.userId
        const user = await User.findOne({userId:userId}) // fetching user details and attaching to request
        req.user = user;
        next() // why this is used inside jwt verify

        // jwt.verify is used to verify token and parameters are token, secretkey, callback function with err and payload
        // err is the error object and payload contains details of the token payload provided while creating token
    })
    
}

// Authorization check
const verifyAdmin = (req, res, next)=>{
    
    if(req.user.userType !== userTypes.ADMIN){
        return res.status(403).send({message:"You are not authorized to perform this action"})
    }
    // checking if userType of user matches ADMIN
    next()
}

module.exports = {
    verifyToken,
    verifyAdmin
}