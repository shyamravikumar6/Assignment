const router = require('express').Router();
const {getAllProduct,updateProduct, deleteProduct,createProduct} = require('../controllers/controller');
router.post('/getAll',getAllProduct);
router.post('/create',createProduct);
router.delete('/delete',deleteProduct);
router.put('/update',updateProduct);
module.exports = router;