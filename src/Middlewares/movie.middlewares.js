
const verifyCreateMovieRequest = (req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({message:"Movie Name is not provided"})
    }
    if(!req.body.releaseDate){
        return res.status(400).send({message:"Release Date is not provided"})
    }
    if(!req.body.releaseStatus){
        return res.status(400).send({message:"MovieStatus is not provided"})
    }
    next()
}

module.exports = {
    verifyCreateMovieRequest
}