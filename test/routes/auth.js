const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// to show the signup form
router.get('/register', (req,res) => {
    res.render('auth/signup');
})

// actually want to register the user in my database
router.post('/register', async (req,res) => {
    try {
        const { username, email, password , role} = req.body;
        const user = new User({ username, email, role });
        const newUser = await User.register(user, password);
        req.login(newUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to the Shooping App!');
            res.redirect('/products');
        });
    } catch (err) {
        req.flash('error', 'An error occurred while registering. Please try again.');
        res.redirect('/register');
    }
});

//to get login form
router.get('/login', (req,res) => {
    res.render('auth/login');
})

// to login the user
router.post('/login', 
    passport.authenticate('local',
    { failureRedirect: '/login',
    failureFlash: true
})
, (req,res ) => {

    req.flash('success', 'You have successfully logged in!');
    res.redirect('/products');
});

// to logout the user
router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have successfully logged out!');
        res.redirect('/login');
    });
});
module.exports = router;