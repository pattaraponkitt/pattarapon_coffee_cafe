const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), customerController.getAllCustomers);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), customerController.getCustomerById);
router.post('/', customerController.createCustomer);
router.put('/:id', authMiddleware.authenticate, customerController.updateCustomer);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), customerController.deleteCustomer);

module.exports = router;