// schema for your server side validation
const { name } = require('ejs');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.number().min(0).required(),
    desc: Joi.string().required()
})

const reviewSchema = Joi.object({
    rating: Joi.string().min(1).max(5).required(),
    comment: Joi.string().required()

})

module.exports = {productSchema,reviewSchema};