const { dbHelper } = require('../helper/dbhelper')
const db = new dbHelper();
exports.getAllProduct = async (req, res) => {
    try {
        let productObj = await db.getAllProduct();
        handleRespone(req, res, 200, null, productObj);

    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }
}


exports.getAllCategory = async (req, res) => {
    try {
        
        let categoryObj = await db.getAllCategory();
        handleRespone(req, res, 200, null, categoryObj);
    } catch (e) {
        handleRespone(req, res, 400, e.toString())
    }
}


exports.createProduct = async (req, res) => {
    try {
        if(!req.body) throw "body is Empty";
        let { Name, categoryId } = req.body;
        await db.createProduct({ Name, category: categoryId, productId: { $inc: 1 } });
        handleRespone(req, res, 200, null, 'Successfully Created');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }

}

exports.createCategory = async (req, res) => {
    try {
        if(!req.body) throw "body is Empty";
        let { Name } = req.body;
        let checkExist = await db.getCategory(Name);
        if (!checkExist) db.createCategory(Name);
        handleRespone(req, res, 200, null, 'Successfully Created');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        if(!req.query) throw "Id is empty";
        const Id = req.query.Id;
        await db.deleteProduct(Id);
        handleRespone(req, res, 200, null, 'Successfully Deleted');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        if(!req.query) throw "Id is empty";
        const Id = req.query.Id;
        await db.deleteProduct(Id);
        handleRespone(req, res, 200, null, 'Successfully Deleted');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }

}
