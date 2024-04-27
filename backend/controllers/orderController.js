const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
        },
      ],
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createOrder = async (req, res) => {
  const { employeeId, customerId, orderStatus, paymentMethodId, orderItems } = req.body;
  try {
    const order = await Order.create({
      employeeId,
      customerId,
      orderStatus,
      paymentMethodId,
    });

    const orderItemsData = orderItems.map((item) => ({
      ...item,
      orderId: order.orderId,
    }));

    await OrderItem.bulkCreate(orderItemsData);

    const createdOrder = await Order.findByPk(order.orderId, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
        },
      ],
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { employeeId, customerId, orderStatus, paymentMethodId, orderItems } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({
      employeeId,
      customerId,
      orderStatus,
      paymentMethodId,
    });

    await OrderItem.destroy({ where: { orderId: id } });

    const orderItemsData = orderItems.map((item) => ({
      ...item,
      orderId: id,
    }));

    await OrderItem.bulkCreate(orderItemsData);

    const updatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
        },
      ],
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });}
};
exports.deleteOrder = async (req, res) => {
const { id } = req.params;
try {
const order = await Order.findByPk(id);
if (!order) {
return res.status(404).json({ message: 'Order not found' });
}
await OrderItem.destroy({ where: { orderId: id } });
await order.destroy();

res.sendStatus(204);} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
    }
};