const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

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

  await sendEmail({
    to: customer.email,
    subject: `Order Confirmation - ${order._id}`,
    html: `<h1>Thank you for your order!</h1>
           <p>Your order <strong>#${order._id}</strong> has been successfully placed.</p>
           <p>Total: ₹${total}</p>`
  });

  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Order Received - ${order._id}`,
    html: `<p>A new order has been placed by ${customer.name}.</p>`
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

  // Notify Admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `Payment verification required - Order ${order._id}`,
    html: `<p>A customer has uploaded a payment screenshot for order #${order._id}. Please review it in the admin dashboard.</p>`
  });

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

  await sendEmail({
    to: order.customer.email,
    subject: `Order Status Update - ${order._id}`,
    html: `<p>Your order status has been updated to: <strong>${status}</strong></p>`
  });

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

  await sendEmail({
    to: order.customer.email,
    subject: `Payment Verified - Order ${order._id}`,
    html: `<p>Your payment for order #${order._id} has been successfully verified!</p>`
  });

  res.json({ success: true, data: order, message: 'Payment verified' });
};

exports.rejectPayment = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404); throw new Error('Order not found');
  }

  order.paymentStatus = 'Rejected';
  await order.save();

  await sendEmail({
    to: order.customer.email,
    subject: `Payment Rejected - Order ${order._id}`,
    html: `<p>Unfortunately, your payment connection for order #${order._id} failed verification.</p>`
  });

  res.json({ success: true, data: order, message: 'Payment rejected' });
};
