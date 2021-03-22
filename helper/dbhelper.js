const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types
const { CategoryCollection } = require('../collections/categoryschema');
const { ProductCollection } = require('../collections/productschema');
class DbHelper {


    constructor() {
        mongoose.connect(process.env.URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then()
    }

    async disConnect() {
        try {
            await this.client.close();
        } catch (e) {
            throw Error(e.toString());
        }
    }

    async getProduct(data) {
        try {


            let productObj = await ProductCollection.findOne(data).populate('category', "categoryId  Name");
            return productObj;


        } catch (e) {
            throw Error(e.toString());
        }

    }

    async getCategory(data) {
        try {
            // //;

            let categoryObj = await CategoryCollection.findOne(data);
            return categoryObj;

            // //

        } catch (e) {
            throw Error(e.toString());
        }
    }

    async getAllProduct(skip,limit) {
        try {
            // //;
            let productObj = await ProductCollection.find({}).populate([{path:'category', select:"Name  categoryId"}]).skip(skip).sort({ productId: 1 }).limit(limit);
            //
            return productObj;
        } catch (e) {
            throw Error(e.toString());
        }

    }

    async getAllCategory(skip,limit) {
        try {
            //;
            let categoryObj = await CategoryCollection.find({}).skip(skip).sort({ categoryId: 1 }).limit(limit);
            //
            return categoryObj;
        } catch (e) {
            throw Error(e.toString());
        }
    }

    async createProduct(data) {
        try {
            //;
            // console.log(data, 'dbhelper');
            let productId = 0;
            let productObj = await ProductCollection.find({}).sort({ productId: -1 });
            productObj = productObj[0];
            console.log(productObj)
            if (productObj) { productId = productObj.productId }
            productId++;
            // console.log(productId);
            data.productId = productId;
            console.log(data);
            let resObj = await ProductCollection.create(data);
            console.log(resObj);
            //
        } catch (e) {
            throw Error(e.toString());
        }
    }

    async createCategory(data) {
        try {
            //;
            let categoryId = 0;
            let categoryObj = await CategoryCollection.find({}).sort({ categoryId: -1 });
            categoryObj = categoryObj[0];
            if (categoryObj) { categoryId = categoryObj.categoryId }
            categoryId++;
            data.categoryId = categoryId;   
            console.log(data, categoryObj);
            await CategoryCollection.create(data);
            //
        } catch (e) {
            throw Error(e.toString());
        }
    }

    

    async  operationCategory(operation,Id,data) {
        try {
            //;
            if(operation=='delete'){
            await CategoryCollection.findOneAndDelete({ categoryId: Id });
            }else{
            await CategoryCollection.findOneAndUpdate({categoryId:Id},data);
            }
            //

        } catch (e) {
            throw Error(e.toString());
        }
    }


    async operationProduct(operation,Id,data) {
        try {
            //;
            if(operation=='delete'){
            await ProductCollection.findOneAndDelete({ productId: Id });
            }else{
                console.log(data,Id);
                await ProductCollection.findOneAndUpdate({productId:Number(Id)},data)
            }
            //
        } catch (e) {
            throw (e.toString());
        }
    }


}


module.exports = { dbHelper: DbHelper }
