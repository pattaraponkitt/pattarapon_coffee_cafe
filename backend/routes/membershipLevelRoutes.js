const express = require('express');
const router = express.Router();
const membershipLevelController = require('../controllers/membershipLevelController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', membershipLevelController.getAllMembershipLevels);
router.get('/:id', membershipLevelController.getMembershipLevelById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), membershipLevelController.createMembershipLevel);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), membershipLevelController.updateMembershipLevel);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), membershipLevelController.deleteMembershipLevel);

module.exports = router;