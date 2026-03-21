const express = require('express');
const Product = require('../models/Product');
const router = express.Router();


//to show all the products
router.get('/products',async(req,res) => {
     const products = await Product.find({});
    res.render('products/index',{products});
})

//to show the details of a particular product
router.get('/product/new',async(req,res) => {
    res.render('products/new');
})

//to create a new product
router.post('/products',async(req,res) => {
    const {name,img,price,desc} = req.body;
    await Product.create({name,img,price,desc})
    res.redirect('/products');
})

// to show the details of a particular product
router.get('/products/:id',async(req,res) => {
    const {id} = req.params;
    const foundProduct = await Product.findById(id);
    res.render('products/show',{foundProduct});
})


module.exports = router;