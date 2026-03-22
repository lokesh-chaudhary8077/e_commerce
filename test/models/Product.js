const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]

})



//middleware jo BTS mongodb operations ke baad execute hota hai

ProductSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id: {$in: product.reviews}})
    }
})


 
let Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
