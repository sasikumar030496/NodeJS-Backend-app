// Libraries used - express, nodemon, body-parser

const express = require("express") // importing libraries
const mongoose = require("mongoose") // importing mongoose library
// var {productsData} = require("./data") // importing modules / destructing required because we are fetching the data of the variable productsData
var bodyParser = require('body-parser') //importing body-parser to parse request body data to JSON

const app = express(); // creating app
app.use(bodyParser.json()) //using bodyparser which parses any data to json and saves to req.body


// Setting port for the application
app.listen(3000, ()=>{
    console.log("Your application is running on port 3000");
}) // setting port for the app

//Sample GET request 
// app.get("/", (req,res)=>{
//     return res.send("This is HomePage")
// }) // creating routes for the app

// // GET request for fetching all products
// app.get("/products", (req,res)=>{
//     return res.status(200).send(productsData)
// })

// // GET request for fetching specific product
// app.get("/products/:id", (req,res)=>{
//     console.log(req.params);  // req.params fetches the dynamic parameters passed on the request URL, same as useParams() hook in React
//     const productId = req.params.id;
//     const product = productsData.find((product)=>product.id == productId);
//     if(!product){
//         return res.status(404).send({message:"Product not found"});
//     }
//     return res.status(200).send(product);
// })

// // POST request for creating product
// app.post("/products", (req,res)=>{
//     const newProduct = req.body
//     newProduct.id = Math.floor(Math.random()*100).toString()

//     productsData.push(newProduct)

//     return res.status(201).send({message:"Product created"})
// })

// // PUT request for updating specific product
// app.put("/products/:id",(req,res)=>{
//     const productId = req.params.id;
//     const product = productsData.find((product)=>product.id == productId);
//     if(!product){
//         return res.status(404).send({message:"Product not found"});
//     }
//     const updatedProduct = req.body
//     Object.keys(updatedProduct).forEach((key)=>{product[key] = updatedProduct[key]})

//     return res.status(200).send(product)
// })

// // DELETE request for deleting specific product
// app.delete("/products/:id", (req,res)=>{
//     const productId = req.params.id;
//     const product = productsData.find((product)=>product.id == productId);
//     if(!product){
//         return res.status(404).send({message:"Product not found"});
//     }
//     productsData = productsData.filter((product)=>product.id!=productId)
//     return res.status(200).send({message:`Product ID ${productId} deleted successfully`})
// })

// MongoDB and Mongoose Intergration and API creation in One file

const dbURL = "mongodb+srv://sasikumar:qwerty123@cluster0.snqg7dc.mongodb.net/?retryWrites=true&w=majority"  // MongoDB URL fetched from cloud.mongodb and providing username and password

mongoose.connect(dbURL).then(()=>{
    console.log("Successfully connected to Database");
}).catch((error)=>{
    console.log("Unable to connect to Database ",error);
}) // connecting to MongoDB 


// Product schema is blueprint of product
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

// Create a new product

app.post("/products", async (req,res)=>{
    const {name, description, category, price} = req.body

    // Validating negative conditions
    if(!price || price<0){
        return res.status(400).send({message:"Price cannot be null or negative"})
    }
    if(!name){
        return res.status(400).send({message:"Name of the product can't be null"})
    }
    const productData = {
        name,
        description,
        category,
        price
    }

    const newProduct = new Product(productData)  // Creating new product from productModel
    try {
        const response = await newProduct.save();
        return res.status(201).send({message:"New Product created"})
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }

})

// Fetching all products
app.get("/products", async (req, res)=>{
    const {category, maxPrice} = req.query  // req.query fetched the filter conditions given when ,calling API
    const query = {}
    if(category){
        query.category = category
    }
    if(maxPrice){
        query.price={
            $lte:maxPrice  // aggregate condition for price lessthanequalsto
        }
    }
    try {
        const products = await Product.find(query)  // if no filter passed then query is null and fetches all products
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

app.get("/products/:id", async (req, res)=>{
    const productId = req.params.id

    // Mongoose ObjectID used to validate automatically generated _id while product creation
    if(!mongoose.Types.ObjectId.isValid(productId)){  
        return res.status(400).send({message:"ID is invalid"})
    }
    try {
        const product = await Product.findById(productId)  // Mongoose method to find object by ID
        if(!product){
            return res.status(400).send({message:"Product not found"})
        }
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

// Updating a product

app.put("/products/:id", async (req, res)=>{
    const productId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).send({message:"ID is invalid"})
    }
    
    const updatedProductDetails= req.body

    try {
        const product = await Product.findByIdAndUpdate(productId, updatedProductDetails, {new:true}) // Mongoose method to find object by ID and update details from req.body, new:true is used to display updated details while calling API
        if(!product){
            return res.status(400).send({message:"Product not found"})
        }
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})

// Deleting a product

app.delete("/products/:id", async (req, res)=>{
    const productId = req.params.id

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).send({message:"ID is invalid"})
    }

    try {
        const product = await Product.findByIdAndDelete(productId)  // Mongoose method to find object by ID and delete
        if(!product){
            return res.status(400).send({message:"Product not found"})
        }
        return res.status(200).send({message:`Product ${product.name} deleted`})
    } catch (error) {
        return res.status(500).send({message:"Internal Server Error"})
    }
})