const mongoose  = require('mongoose');
const productSchema = new mongoose.Schema(
    {
        productId:{
            type:Number,
            unique:true,
            required:true,
        },
        Name:{
            type:String,
            required:true,
            unique:true,
        },
        category:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'categoryschema'
        }
    },{
        timestamps:true
    }
)


module.exports = {ProductCollection:mongoose.model('productschema',productSchema)}