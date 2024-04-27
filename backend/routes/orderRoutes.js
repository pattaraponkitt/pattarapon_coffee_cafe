const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), orderController.getAllOrders);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), orderController.getOrderById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), orderController.createOrder);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), orderController.updateOrder);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), orderController.deleteOrder);

module.exports = router;