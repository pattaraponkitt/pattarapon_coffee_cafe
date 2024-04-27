const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), roleController.getAllRoles);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), roleController.getRoleById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), roleController.createRole);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), roleController.updateRole);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), roleController.deleteRole);

module.exports = router;