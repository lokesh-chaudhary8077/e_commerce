const express = require('express');
const route = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');

// route to show the cart of the user
route.get('/user/cart',isLoggedIn,async(req,res) => {
    let userId = req.user._id;
    let user = await User.findById(userId).populate('cart');
    res.render('cart/cart',{cart:user.cart});
});

// to actually add the product to the cart
route.post('/user/:productId/add',isLoggedIn,async(req,res) => {
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
});

module.exports = route;