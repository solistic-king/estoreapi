const mongoose = require('mongoose');
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        requred: true
    },
    description: {
        type: String,
        required: true
    },
    isPrimary: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('category', categorySchema)