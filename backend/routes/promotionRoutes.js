const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', promotionController.getAllPromotions);
router.get('/:id', promotionController.getPromotionById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), promotionController.createPromotion);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), promotionController.updatePromotion);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), promotionController.deletePromotion);

module.exports = router;