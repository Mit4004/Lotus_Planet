const Order = require('../models/Order');
exports.createOrder = async (req, res) => {
  const { customer, items, address, subtotal, shippingCharge, total, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    res.status(400); throw new Error('No order items');
  }

  const order = await Order.create({
    customer,
    userId: req.user ? req.user.id : undefined,
    items,
    address,
    subtotal,
    shippingCharge,
    total,
    paymentMethod,
    orderStatus: 'Placed',
    statusHistory: [{ status: 'Placed', note: 'Order placed successfully' }]
  });

  res.status(201).json({ success: true, data: order, message: 'Order created successfully' });
};

exports.getAllOrders = async (req, res) => {
  const { status, paymentStatus } = req.query;
  let query = {};
  if (status) query.orderStatus = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  const orders = await Order.find(query).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }
  res.json({ success: true, data: order });
};

exports.uploadPaymentScreenshot = async (req, res) => {
  const { paymentScreenshot } = req.body; // Expects { url, publicId }
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404); throw new Error('Order not found');
  }

  order.paymentScreenshot = paymentScreenshot;
  order.paymentStatus = 'Pending Verification'; // Moves from initially 'Pending' to 'Pending Verification'
  
  order.statusHistory.push({
    status: order.orderStatus,
    note: 'Customer uploaded payment screenshot'
  });

  await order.save();

  res.json({ success: true, data: order, message: 'Screenshot uploaded and forwarded to Admin' });
};

exports.updateOrderStatus = async (req, res) => {
  const { status, note } = req.body;
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }

  order.orderStatus = status;
  if (note) {
    order.statusHistory.push({ status, note });
  }

  await order.save();

  res.json({ success: true, data: order, message: 'Order status updated' });
};

exports.verifyPayment = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }

  order.paymentStatus = 'Verified';
  order.orderStatus = 'Confirmed';
  await order.save();

  res.json({ success: true, data: order, message: 'Payment verified' });
};

exports.rejectPayment = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }

  order.paymentStatus = 'Rejected';
  await order.save();

  res.json({ success: true, data: order, message: 'Payment rejected' });
};
