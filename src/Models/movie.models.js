const { default: mongoose } = require("mongoose")
const { releaseStatus } = require("../utils/constants")

// ProductSchema is blueprint of product
const movieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cast:{
        type:[String],  // array of strings
        required:true,
    },
    language:{
        type:String,
        required:true
    },
    trailerUrl:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    releaseDate:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    releaseStatus:{
        type:String,
        required:true,
        enum:Object.values(releaseStatus) // list of values
    }
})

const Movie = mongoose.model("Movies", movieSchema);  // creating movieModel from schema

module.exports = Movie;