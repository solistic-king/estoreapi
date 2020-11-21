const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories : [{
        type: Schema.Types.ObjectId,
        ref : "category"
    }],
    rating: {
        current: { type: Number, default: 0 },
        numOfRatings : { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('product', productSchema)