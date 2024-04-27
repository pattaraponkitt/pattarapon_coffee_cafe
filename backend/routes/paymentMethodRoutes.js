const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), productController.createProduct);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), productController.updateProduct);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), productController.deleteProduct);

module.exports = router;