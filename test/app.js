const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');

const productRoute = require('./routes/product');
const reviewRoute = require('./routes/review');
const authRoute = require('./routes/auth');



mongoose.connect('mongodb://127.0.0.1:27017/shoopingApp')
.then(() => {console.log("Db connected successfully")})
.catch((err) => {console.log("Db not connected successfully")})


// session configuration
let configSession = ({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
}) 


//passport
passport.use(new LocalStrategy(User.authenticate()));

//seeding the database
// seedDB();
app.use(productRoute); // to use the product routes
app.use(reviewRoute); // to use the review routes
app.use(authRoute); // to use the auth routes




app.listen(8080,() => {
    console.log('server is running at port 8080');
})