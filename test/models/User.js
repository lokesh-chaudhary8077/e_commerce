const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true  
    },
    role: {
        type: String,
        required: true,
        // enum: ['admin', 'customer'],
        default: 'customer'
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});
userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', userSchema);
module.exports = User;
