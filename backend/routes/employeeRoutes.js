const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), employeeController.getAllEmployees);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), employeeController.getEmployeeById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), employeeController.createEmployee);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), employeeController.updateEmployee);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), employeeController.deleteEmployee);

module.exports = router;