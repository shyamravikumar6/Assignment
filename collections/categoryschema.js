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

    }, {
    timestamps: true
}
)


module.exports = { CategoryCollection: mongoose.model('category', categorySchema) }