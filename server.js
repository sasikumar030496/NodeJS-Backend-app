// Libraries used - express, nodemon, body-parser

const express = require("express") // importing libraries
const mongoose = require("mongoose") // importing mongoose library
// var {productsData} = require("./data") // importing modules / destructing required because we are fetching the data of the variable productsData
var bodyParser = require('body-parser'); //importing body-parser to parse request body data to JSON
require("dotenv").config(); // This will enable us to use environmental variables
var cors = require("cors")
const authRoutes = require("./src/Routes/auth.routes");
const productRoutes = require("./src/Routes/product.routes");// Importing product(app)routes
const movieRoutes = require("./src/Routes/movie.routes");
const { PORT } = require("./src/configs/server.config");
const { DBURL } = require("./src/configs/db.config");
const theatreRoutes = require("./src/Routes/theatre.routes");
const bookingRoutes = require("./src/Routes/booking.routes");
const paymentRoutes = require("./src/Routes/payment.routes");

const app = express(); // creating app
app.use(cors()) // cors usage allows to accept API request from different origin, here if we don't mention any origin it accepts request from all the origins
app.use(bodyParser.json()) //using bodyparser which parses any data to json and saves to req.body

 // Setting port for the application
app.listen(PORT, ()=>{
    console.log(`Your application is running on port ${PORT}`);
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

  
// DBURL is the URL fetched from env var which got from cloud.mongodb and providing username and password
mongoose.connect(DBURL).then(()=>{
    console.log("Successfully connected to Database");
}).catch((error)=>{
    console.log("Unable to connect to Database ",error);
}) // connecting to MongoDB 

productRoutes(app)
authRoutes(app)
movieRoutes(app)
theatreRoutes(app)
bookingRoutes(app)
paymentRoutes(app)