const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview} = require('../middleware');


router.post('/products/:id/reviews',validateReview ,async(req,res) => {
    try {
    const {id} = req.params;
    const {rating,comment} = req.body;
    const product = await Product.findById(id);
    const review = new Review({rating,comment});
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);
    } 
    catch (e) {
        res.status(500).render('error',{err:e.message});
    }

})

module.exports = router;