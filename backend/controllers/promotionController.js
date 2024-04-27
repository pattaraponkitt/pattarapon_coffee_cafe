const Promotion = require('../models/promotion');

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPromotionById = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createPromotion = async (req, res) => {
  const { promotionName, discountRate, startDate, endDate } = req.body;
  try {
    const promotion = await Promotion.create({
      promotionName,
      discountRate,
      startDate,
      endDate,
    });
    res.status(201).json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { promotionName, discountRate, startDate, endDate } = req.body;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    await promotion.update({
      promotionName,
      discountRate,
      startDate,
      endDate,
    });
    res.json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    await promotion.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};