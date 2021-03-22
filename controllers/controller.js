const { dbHelper } = require('../helper/dbhelper');
const {ProductCollection} = require('../collections/productschema');
const {CategoryCollection} = require('../collections/categoryschema');
const {handleResponse} = require('../handleresponse');
const db = new dbHelper();
exports.getAllProduct = async (req, res) => {
    try {
        let skip=Math.floor(req.body.start/req.body.length)*req.body.length; 
        console.log(skip);
        let limit = Number(req.body.length);
        let Product=[],totallength;
        // console.log(req.body);
        let productObj = await db.getAllProduct(skip,limit);
        console.log(skip,productObj);
        totallength= (await ProductCollection.find({})).length;
        productObj.forEach((product)=>{
          let productElement={productName:product.productName,productId:product.productId,categoryName:product.category?product.category.Name:'--------',categoryId:product.category?product.category.categoryId:'-----'};
          Product.push(productElement);
        })
        let data = {
            'draw': parseInt(req.body.draw),
            'recordsTotal': totallength,
            'recordsFiltered': totallength,
            'data': Product
          }

        handleResponse(req, res, 200, null, data);

    } catch (e) {
        handleResponse(req, res, 400, e.toString());
    }
}


exports.getAllCategory = async (req, res) => {
    try {
        if(req.body.extractAll==='true'){
            // console.log(req.body);
           let data =  await db.getAllCategory();
           return handleResponse(req,res,200,null,data); 
        }
        let skip=Math.floor(req.body.start/req.body.length)*req.body.length; 
        let limit = Number(req.body.length);
        let Category=[],totallength=0;
        // console.log(req.body);
        let categoryObj = await db.getAllCategory(skip,limit);
        console.log(skip,categoryObj);
        totallength=(await CategoryCollection.find()).length;
        categoryObj.forEach((category)=>{
          let categoryElement={categoryName:category.Name,categoryId:category.categoryId};
          Category.push(categoryElement);
        })
        let data = {
            'draw': parseInt(req.body.draw),
            'recordsTotal': totallength,
            'recordsFiltered': totallength,
            'data': Category
          }

     
        handleResponse(req, res, 200, null, data);
    } catch (e) {
        handleResponse(req, res, 400, e.toString())
    }
}


exports.createProduct = async (req, res) => {
    try {
        if(!req.body) throw "body is Empty";
        console.log(req.body);
        await db.createProduct(req.body);
        handleResponse(req, res, 200, null, 'Successfully Created');
    } catch (e) {
        handleResponse(req, res, 400, e.toString());
    }

}

exports.createCategory = async (req, res) => {
    try {
        if(!req.body) throw "body is Empty";
        console.log(req.body);
        let { categoryName } = req.body;
        let checkExist = await db.getCategory({Name:categoryName});
        if(checkExist) throw "Already Exist";        
        db.createCategory({Name:categoryName});
        handleResponse(req, res, 200, null, 'Successfully Created');
    } catch (e) {
        console.log(e.toString());
        handleResponse(req, res, 400, e.toString());
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        if(!req.query) throw "Id is empty";
        const Id = req.query.Id;
        await db.operationProduct('delete',Id);
        handleResponse(req, res, 200, null, 'Successfully Deleted');
    } catch (e) {
        handleResponse(req, res, 400, e.toString());
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        if(!req.query) throw "Id is empty";
        const Id = req.query.Id;
        console.log(Id);
        await db.operationCategory('delete',Id);
        handleResponse(req, res, 200, null, 'Successfully Deleted');
    } catch (e) {
        handleResponse(req, res, 400, e.toString());
    }

}

exports.updateProduct= async(req,res)=>{
    try{
        if(!req.body || !req.query) throw "Empty request or Id is empty";
        const Id = req.query.Id;
        const {productName,category} = req.body;
        console.log(category,productName);
        await  db.operationProduct('update',Id,{productName,category});
        handleResponse(req,res,200,null,'Successfully Update');
    }catch(e){
       handleResponse(req,res,400,e.toString());
    }
}

exports.updateCategory= async(req,res)=>{
    try{
        if(!req.body || !req.query) throw "Empty request or Id is empty";
        const Id = req.query.Id;
        const {categoryName} = req.body;
         console.log(categoryName);
        await db.operationCategory('update',Id,{Name:categoryName});

        handleResponse(req,res,200,null,'Successfully Updated');
    }catch(e){
       handleResponse(req,res,400,e.toString());
    }
}

