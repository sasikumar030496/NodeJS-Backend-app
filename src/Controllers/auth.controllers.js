const User = require("../Models/user.models")
const { SECRET } = require("../configs/auth.config")
const { userStatus, userTypes } = require("../utils/constants")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.signUp = async (req,res)=>{
    const {name, password, email, userId, userType} = req.body
    const status = (userType === userTypes.ADMIN) ? userStatus.APPROVED : userStatus.PENDING
    const hashedPassword = bcrypt.hashSync(password, 10) // bcrypt.hashedPassword(password, no_of_times_tobe_hashed)

    const newUser = new User({
        name,
        password: hashedPassword,
        email,
        userId,
        userType,
        userStatus: status
    })

    try {
        const user = await newUser.save()
        return res.status(201).send(user)
    } catch (error) {
        return res.status(500).send({message : "Something went wrong"+error})
    }
}

exports.signIn = async (req, res)=>{
    const {userId, password} = req.body
    const user = await User.findOne({userId:userId})

    if(!user){
        return res.status(400).send({message:"UserID is not valid"})
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)

    if(!isValidPassword){
        return res.status(400).send({message:"Password is not valid"})
    }
    var token = jwt.sign({userId:userId},SECRET, {expiresIn:'1hr'})
    return res.status(200).send({
        name: 'Sasi',
        email: 'suamsai143@gmail.com',
        userId: 'suamsai143',
        userType: 'CUSTOMER',
        userStatus: 'PENDING',
        accessToken:token
      })
}