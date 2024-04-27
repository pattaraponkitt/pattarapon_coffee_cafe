const RawMaterial = require('../models/rawMaterial');

exports.checkRawMaterialExists = async (req, res, next) => {
  try {
    const rawMaterial = await RawMaterial.findByPk(req.params.id);
    if (!rawMaterial) {
      return res.status(404).json({ message: 'Raw Material not found' });
    }
    req.rawMaterial = rawMaterial;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};