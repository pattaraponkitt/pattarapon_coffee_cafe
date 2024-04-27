const Customer = require('../models/customer');

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createCustomer = async (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;
  try {
    const customer = await Customer.create({ firstName, lastName, email, phone, address });
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, address } = req.body;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.update({ firstName, lastName, email, phone, address });
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    await customer.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};