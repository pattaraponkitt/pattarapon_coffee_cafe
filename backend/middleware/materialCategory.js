const MaterialCategory = require('../models/materialCategory');

exports.checkMaterialCategoryExists = async (req, res, next) => {
  try {
    const materialCategory = await MaterialCategory.findByPk(req.params.id);
    if (!materialCategory) {
      return res.status(404).json({ message: 'Material Category not found' });
    }
    req.materialCategory = materialCategory;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};