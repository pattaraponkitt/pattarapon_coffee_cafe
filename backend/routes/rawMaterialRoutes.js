const express = require('express');
const router = express.Router();
const rawMaterialController = require('../controllers/rawMaterialController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), rawMaterialController.getAllRawMaterials);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), rawMaterialController.getRawMaterialById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), rawMaterialController.createRawMaterial);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), rawMaterialController.updateRawMaterial);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), rawMaterialController.deleteRawMaterial);

module.exports = router;