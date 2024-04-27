const RawMaterial = require('../models/rawMaterial');

exports.getAllRawMaterials = async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.findAll();
    res.json(rawMaterials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getRawMaterialById = async (req, res) => {
  const { id } = req.params;
  try {
    const rawMaterial = await RawMaterial.findByPk(id);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw Material not found' });
    }
    res.json(rawMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createRawMaterial = async (req, res) => {
  const { materialName, description, unit, quantity, lowThreshold, categoryId } = req.body;
  try {
    const rawMaterial = await RawMaterial.create({
      materialName,
      description,
      unit,
      quantity,
      lowThreshold,
      categoryId,
    });
    res.status(201).json(rawMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateRawMaterial = async (req, res) => {
  const { id } = req.params;
  const { materialName, description, unit, quantity, lowThreshold, categoryId } = req.body;
  try {
    const rawMaterial = await RawMaterial.findByPk(id);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw Material not found' });
    }
    await rawMaterial.update({
      materialName,
      description,
      unit,
      quantity,
      lowThreshold,
      categoryId,
    });
    res.json(rawMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteRawMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const rawMaterial = await RawMaterial.findByPk(id);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw Material not found' });
    }
    await rawMaterial.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};