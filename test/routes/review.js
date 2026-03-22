const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');

router.post('/products/:id/reviews',async(req,res) => {
    const {id} = req.params;
    const {rating,comment} = req.body;
    const product = await Product.findById(id);
    const review = new Review({rating,comment});
    product.reviews.push(review);
    await review.save();
    await product.save();
    res.redirect(`/products/${id}`);
})

module.exports = router;