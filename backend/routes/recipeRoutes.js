const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), recipeController.getAllRecipes);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin', 'employee']), recipeController.getRecipeById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize(['admin']), recipeController.createRecipe);
router.put('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), recipeController.updateRecipe);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize(['admin']), recipeController.deleteRecipe);

module.exports = router;