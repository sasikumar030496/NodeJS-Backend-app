const { default: mongoose } = require("mongoose");


const theatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:String,
        required:true
    },
    movies:{
        type:[mongoose.SchemaTypes.ObjectId], // This refers to Id of the referred collection
        ref:'Movies' // Movies is collection of movieSchema
    }
})

const Theatre = mongoose.model("Theatres", theatreSchema) // here Theatres is collection in mongoDB
module.exports = Theatre;