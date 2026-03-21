const mongoose = require('mongoose');
const Product = require('./models/Product');
const products = [
    {
    name: 'Mountain Bike',
    img: 'https://images.unsplash.com/photo-1508973378894-7e4c7a1b4a9d?w=600&h=400&fit=crop',
    price: 10000,
    desc: 'A high-quality mountain bike for off-road adventures.'
},
{
    name: 'Wireless Headphones',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop',
    price: 15000,
    desc: 'Premium wireless headphones for crystal-clear sound.'
},
    {
        name: 'Gaming Keyboard',
        img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        price: 20000,
        desc: 'A high-performance gaming keyboard with mechanical switches.'
    },
    {
        name: 'Smartphone',
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
        price: 25000,
        desc: 'A cutting-edge smartphone with advanced features.'
    },
    {
        name: 'Laptop',
        img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        price: 30000,
        desc: 'A powerful laptop for productivity and entertainment.'
    },
    {
        name: 'Tablet',
        img: 'https://images.unsplash.com/photo-1508973378894-7e4c7a1b4a9d?auto=format&fit=crop&w=600&q=80',
        price: 35000,
        desc: 'A versatile tablet for work and play.'
    }
];
    
async function seedDB() {
    await Product.insertMany(products);
    console.log("Database seeded successfully");
}
module.exports = seedDB;
