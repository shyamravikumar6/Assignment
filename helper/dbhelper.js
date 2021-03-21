const MongooseClient = require('mongodb').MongoClient;
const {CategoryCollection} = require('../collections/categoryschema');
const {ProductCollection} = require('../collections/productschema');
class DbHelper{
 
     constructor(){
         
         this.client = new MongooseClient(process.env.URI,{useNewUrlParser:true,useUnifiedTopology:true});
     }

     async connect(){
        try{
        await this.client.connect();
        }catch(e){
            throw Error(e.toString());
        }
     }
     
     async disConnect(){
        try{
        await this.client.close();
        }catch(e){
            throw Error(e.toString());
        }
     }

     async getProduct(data,operation){
        try{
        await this.connect();
        if(operation=='pull'){
        let productObj = await ProductCollection.findOne(data).populate('category',"categoryId  Name");
        return productObj;
        }else{
          await ProductCollection.deleteOne({_id:Id});
        }
        await this.disConnect()
        
        }catch(e){
            throw Error(e.toString());
        }
       
    }

     async getCategory(data,operation){
         try{
            await this.connect();
            if(operation){
                let categoryObj= await CategoryCollection.findOne(data);
                return categoryObj;
            }else{
                await CategoryCollection.deleteOne({_id:Id});
            }
            await this.disConnect();
            return categoryObj;
         }catch(e){
            throw Error(e.toString());
         }
     }

     async getAllProduct(){
         try{
         await this.connect();
         let productObj = await ProductCollection.find({}).populate('category',"Name  categoryId").sort({productId:1});
         await this.disConnect();
         return productObj;
        }catch(e){
            throw Error(e.toString());
        }

     }

     async getAllCategory(){
         try{
             await this.connect();
             let categoryObj= await CategoryCollection.find({}).sort({categoryId:1});
             await this.disConnect();
             return categoryObj;
         }catch(e){
             throw Error(e.toString());
         }
     }

     async createProduct(data){
         try{
            await this.connect();
            await ProductCollection.create(data); 
            await this.disConnect();
         }catch(e){
             throw Error(e.toString());
         }
     }

     async createCategory(data){
         try{
            await this.connect();
            await CategoryCollection.create(data);
            await this.disConnect();
         }catch(e){
             throw Error(e.toString());
         }
     }


     async deleteCategory(Id){
         try{
             await this.connect();
             await CategoryCollection.findByIdAndDelete({_id:Id});
             await this.disConnect();
         }catch(e){
             throw Error(e.toString());
         }
     }

    
     async deleteProduct(Id){
         try{
             await this.connect();
             await ProductCollection.findByIdAndDelete({_id:Id});
             await this.disConnect();
         }catch(e){
             throw (e.toString());
         }
     }
     

    }


module.exports={dbHelper:DbHelper}
