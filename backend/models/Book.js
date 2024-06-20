const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String }
});

module.exports = mongoose.model('Book', BookSchema);