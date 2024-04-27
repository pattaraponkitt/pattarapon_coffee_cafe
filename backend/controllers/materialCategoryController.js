const MaterialCategory = require('../models/materialCategory');

exports.getAllMaterialCategories = async (req, res) => {
  try {
    const materialCategories = await MaterialCategory.findAll();
    res.json(materialCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getMaterialCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const materialCategory = await MaterialCategory.findByPk(id);
    if (!materialCategory) {
      return res.status(404).json({ message: 'Material Category not found' });
    }
    res.json(materialCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createMaterialCategory = async (req, res) => {
  const { categoryName, description } = req.body;
  try {
    const materialCategory = await MaterialCategory.create({ categoryName, description });
    res.status(201).json(materialCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateMaterialCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, description } = req.body;
  try {
    const materialCategory = await MaterialCategory.findByPk(id);
    if (!materialCategory) {
      return res.status(404).json({ message: 'Material Category not found' });
    }
    await materialCategory.update({ categoryName, description });
    res.json(materialCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteMaterialCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const materialCategory = await MaterialCategory.findByPk(id);
    if (!materialCategory) {
      return res.status(404).json({ message: 'Material Category not found' });
    }
    await materialCategory.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};