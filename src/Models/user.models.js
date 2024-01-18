const { default: mongoose } = require("mongoose")
const { userTypes, userStatus } = require("../utils/constants")

// UserSchema is blueprint of user
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    userId:{
        type:String,
        minLength:4,
        required:true,
    },
    userType:{
        type:String,
        required:true,
        enum:Object.values(userTypes),
        default:userTypes.CUSTOMER
    },
    userStatus:{
        type:String,
        required:true,
        enum:Object.values(userStatus),
        default:userStatus.PENDING
    }
})

const User = mongoose.model("Users", UserSchema)  // creating userModel from schema

module.exports = User