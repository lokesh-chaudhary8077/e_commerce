const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoute = require('./routes/product');
const ejsMate = require('ejs-mate');


mongoose.connect('mongodb://127.0.0.1:27017/shoopingApp')
.then(() => {console.log("Db connected successfully")})
.catch((err) => {console.log("Db not connected successfully")})


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//seeding the database
// seedDB();
app.use(productRoute);



app.listen(8080,() => {
    console.log('server is running at port 8080');
})