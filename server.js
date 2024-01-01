// Libraries used - express, nodemon, body-parser

const express = require("express") // importing libraries
const mongoose = require("mongoose") // importing mongoose library
// var {productsData} = require("./data") // importing modules / destructing required because we are fetching the data of the variable productsData
var bodyParser = require('body-parser') //importing body-parser to parse request body data to JSON

const app = express(); // creating app
app.use(bodyParser.json()) //using bodyparser which parses any data to json and saves to req.body

const ProductRoutes = require("./src/Routes/product.routes") // Importing product(app)routes 

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


ProductRoutes(app)