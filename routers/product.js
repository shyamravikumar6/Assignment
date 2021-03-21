const router = require('express').Router();
const {getAllProduct,deleteProduct,createProduct} = require('../controllers/controller');
router.post('/getAll',getAllProduct);
router.post('/create',createProduct);
router.delete('/delete',deleteProduct);
module.exports = router;