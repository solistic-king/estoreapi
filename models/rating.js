const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "product"
    },
    rating: { 
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('rating', ratingSchema)