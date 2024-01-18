const User = require("../Models/user.models")

const verifySignUpRequest = async(req, res, next)=>{
    const {name, email, userId, userType} = req.body
    if(!name){
        res.status(400).send({message : "Failed! Name is not provided"})
    }
    if(!email){
        res.status(400).send({message : "Failed! Email is not provided"})
    }
    if(!userId){
        res.status(400).send({message : "Failed! UserId is not provided"})
    }
    if(!userType){
        res.status(400).send({message : "Failed! UserType is not provided"})
    }

    const users = await User.find({
        $or:[
            {userId:userId},
            {email:email}
        ]
    })

    // Negative validation if userId or email already exists
    if(users && users.length){
        return res.status(400).send({message:"UserId or Email already exists"})
    }
    next()
}

const verifySignInRequest = async(req, res, next)=>{
    const {userId, password} = req.body
    if(!userId){
        res.status(400).send({message : "Failed! UserId is not provided"})
    }
    if(!password){
        res.status(400).send({message : "Failed! Password is not provided"})
    }
    next()
}

module.exports = {
    verifySignUpRequest,
    verifySignInRequest
}