const express = require('express');
const router = express.Router();
const materialCategoryController = require('../controllers/materialCategoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), materialCategoryController.getAllMaterialCategories);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), materialCategoryController.getMaterialCategoryById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), materialCategoryController.createMaterialCategory);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), materialCategoryController.updateMaterialCategory);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), materialCategoryController.deleteMaterialCategory);

module.exports = router;