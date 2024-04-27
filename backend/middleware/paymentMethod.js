const PaymentMethod = require('../models/paymentMethod');

exports.checkPaymentMethodExists = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment Method not found' });
    }
    req.paymentMethod = paymentMethod;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};