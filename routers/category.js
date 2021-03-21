const router = require('express').Router();
const {getAllCategory,deleteCategory,createCategory} = require('../controllers/controller');
router.post('/getAll',getAllCategory);
router.post('/create',createCategory);
router.delete('/delete',deleteCategory);
module.exports = router;