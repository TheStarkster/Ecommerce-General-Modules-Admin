const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    mrp: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    rdl: {
        type: String,
        require: false
    },
    CreatedBy: {
        type: String,
        require: false
    },
    brand: {
        type: String,
        require: false
    },
    tags: {
        type: String,
        require: false
    },
    KeyFeatures: {
        type: Array,
        require: false
    },
    PrimaryFeatures: {
        type: Array,
        require: false
    },
    disc: {
        type: String,
        required: false
    },
    price: {
        type: String,
        require: true
    },
    rating: {
        type: String,
        require: false
    },
    stock: {
        type: String,
        required: true
    },
    wrty: {
        type: String,
        required: false
    }
})

const Products = mongoose.model('products', product);
module.exports = Products