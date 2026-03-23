const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const {isSeller,validateProduct,isLoggedIn,isProductAuthor} = require('../middleware');


//to show all the products
router.get('/products',isLoggedIn,async(req,res) => {
    try {
     const products = await Product.find({});
    res.render('products/index',{products});
    } 
    catch (e) {
    res.status(500).render('error',{err:e.message});
     }
})

//to show the form for new product
router.get('/product/new',isLoggedIn,async(req,res) => {
    try {
    res.render('products/new');
    }
    catch (e) {
    res.status(500).render('error',{err:e.message});
     }
})

//to actually add the product   
router.post('/products',validateProduct,isSeller,isLoggedIn,async(req,res) => {
    try {
        const {name,img,price,desc} = req.body;
        await Product.create({name,img,price,desc,author:req.user._id})
        req.flash('success','Product added successfully');
        res.redirect('/products');
    } catch (e) {
        res.status(500).render('error',{err:e.message});
    }
})

// to show the details of a particular product
router.get('/products/:id',isLoggedIn,async(req,res) => {
    try {
        const {id} = req.params;
        const foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show',{foundProduct,msg:req.flash('success')});
    } catch (e) {
        res.status(500).render('error',{err:e.message});
    }
})

//to edit a product
router.get('/products/:id/edit',isLoggedIn,async(req,res) => {
    try {
        const {id} = req.params;
        const foundProduct = await Product.findById(id);
        res.render('products/edit',{foundProduct});
    } catch (e) {
        res.status(500).render('error',{err:e.message});
    }
})

// to actually update the product
router.patch('/products/:id',validateProduct ,isLoggedIn,async(req,res) => {
    try {
        const {id} = req.params;
        const {name,img,price,desc} = req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        req.flash('success','Product edited successfully');
        res.redirect(`/products/${id}`);
    } catch (e) {
        res.status(500).render('error',{err:e.message});
    }
});

// to delete a product
router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res) => {
    try {
    const {id} = req.params;
    const product = await Product.findById(id);
    await Product.findByIdAndDelete(id);
    req.flash('success','Product deleted successfully');
    res.redirect('/products');
    } catch (e) {
        res.status(500).render('error',{err:e.message});
    }
})
module.exports = router;