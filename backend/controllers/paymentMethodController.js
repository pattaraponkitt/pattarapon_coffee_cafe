const PaymentMethod = require('../models/paymentMethod');

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.json(paymentMethods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPaymentMethodById = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment Method not found' });
    }
    res.json(paymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createPaymentMethod = async (req, res) => {
  const { methodName } = req.body;
  try {
    const paymentMethod = await PaymentMethod.create({ methodName });
    res.status(201).json(paymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const { methodName } = req.body;
  try {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment Method not found' });
    }
    await paymentMethod.update({ methodName });
    res.json(paymentMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  const { id } = req.params;
  try {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment Method not found' });
    }
    await paymentMethod.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};