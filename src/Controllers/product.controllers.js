const Product = require("../Models/product.models")

// Create a new product
exports.createProduct = async (req,res)=>{
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

}

// Fetch all products
exports.getProducts = async (req, res)=>{
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
}

// Fetch Individual Product
exports.getProduct = async (req, res)=>{
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
}

// Updating Product
exports.updateProduct = async (req, res)=>{
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
}

// Deleting Product
exports.deleteProduct = async (req, res)=>{
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
}
