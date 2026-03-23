const {productSchema,reviewSchema} = require('./schema');


const validateProduct = (req,res,next) => {
    const {name,img,price,desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc});
    if(error){
        return res.status(400).render('error');
    }
    else{
        next();
    }
}

const validateReview = (req,res,next) => {
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});
    if(error){
        return res.status(400).render('error');
    }
    else{
        next();
    }
}

const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'please login first');
        return res.redirect('/login');
    }
    next();
}
const isSeller = (req,res,next) => {
    if(!req.user.role){
        req.flash('error', 'you do not have permission to perform this action');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error', 'you do not have permission to perform this action');
        return res.redirect('/products');
    }
    next();
}

const isProductAuthor = async (req,res,next) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product){
        req.flash('error', 'Product not found');
        return res.redirect('/products');
    }
    if(product.author.toString() !== req.user._id.toString()){
        req.flash('error', 'you do not have permission to perform this action');
        return res.redirect(`/products/${id}`);
    }
    next();
}

module.exports = {isProductAuthor,isSeller,isLoggedIn,validateProduct,validateReview,isLoggedIn,isSeller,isProductAuthor};
