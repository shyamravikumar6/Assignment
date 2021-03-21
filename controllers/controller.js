const { dbHelper } = require('../helper/dbhelper')
const db = new dbHelper();
export const getAllProduct = async (req, res) => {
    try {
        let productObj = await db.getAllProduct();
        handleRespone(req, res, 200, null, productObj);

    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }
}


export const getAllCategory = async (req, res) => {
    try {

        let categoryObj = await db.getAllCategory();
        handleRespone(req, res, 200, null, categoryObj);
    } catch (e) {
        handleRespone(req, res, 400, e.toString())
    }
}


export const createProduct = async (req, res) => {
    try {
        let { Name, categoryId } = req.body;
        await db.createProduct({ Name, category: categoryId, productId: { $inc: 1 } });
        handleRespone(req, res, 200, null, 'Successfully Created');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }

}

export const createCategory = async (req, res) => {
    try {
        let { Name } = req.body;
        let checkExist = await db.getCategory(Name);
        if (!checkExist) db.createCategory(Name);
        handleRespone(req, res, 200, null, 'Successfully Created');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const Id = req.query.Id;
        await db.deleteProduct(Id);
        handleRespone(req, res, 200, null, 'Successfully Deleted');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const Id = req.query.Id;
        await db.deleteProduct(Id);
        handleRespone(req, res, 200, null, 'Successfully Deleted');
    } catch (e) {
        handleRespone(req, res, 400, e.toString());
    }

}
