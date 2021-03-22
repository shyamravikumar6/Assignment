const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
    {
        categoryId: {
            type: Number,
            unique: true,
            required: true,
        },
        Name: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: {
            type: Number,
            default: Date.now()
        }
    },
)


module.exports = { CategoryCollection: mongoose.model('category', categorySchema) }