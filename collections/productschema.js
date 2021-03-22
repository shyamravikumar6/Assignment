const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        productId: {
            type: Number,
            unique: true,
            required: true,
        },
        productName: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'category'
        },
        createdAt: {
            type: Number,
            default: Date.now()
        }
      
    }   
   
)


module.exports = { ProductCollection: mongoose.model('product', productSchema) }