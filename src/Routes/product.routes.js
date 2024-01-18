const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../Controllers/product.controllers")

module.exports = (app)=>{
    app.post("/ecom/api/v1/products", createProduct),
    app.get("/ecom/api/v1/products", getProducts),
    app.get("/ecom/api/v1/products/:id", getProduct),
    app.put("/ecom/api/v1/products/:id", updateProduct),
    app.delete("/ecom/api/v1/products/:id", deleteProduct)
}

// "ecom/api/v1/products" - this is correct way to define API routes "appName/api/versionID/routeName:params"