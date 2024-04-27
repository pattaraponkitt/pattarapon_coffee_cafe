const OrderItem = require('../models/orderItem');

exports.checkOrderItemExists = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ message: 'Order Item not found' });
    }
    req.orderItem = orderItem;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};