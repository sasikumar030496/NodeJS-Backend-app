const { default: mongoose } = require("mongoose")

// ProductSchema is blueprint of product
const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Electronics","Fashion","Jewellery"]  // enum is choices of selection
    },
    price:{
        type:Number,
        required:true
    }
})

const Product = mongoose.model("Products", ProductSchema)  // creating productModel from schema

module.exports = Product