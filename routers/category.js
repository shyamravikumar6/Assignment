const router = require('express').Router();
const {getAllCategory,updateCategory, deleteCategory,createCategory} = require('../controllers/controller');
router.post('/getAll',getAllCategory);
router.post('/create',createCategory);
router.delete('/delete',deleteCategory);
router.put('/update',updateCategory);
module.exports = router;