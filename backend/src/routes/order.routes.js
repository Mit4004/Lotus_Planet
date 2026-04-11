const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, uploadPaymentScreenshot, verifyPayment, rejectPayment } = require('../controllers/order.controller');
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware');

router.route('/')
  .post(createOrder)
  .get(protect, admin, getAllOrders);

router.route('/:id')
  .get(getOrderById);

router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/upload-screenshot', uploadPaymentScreenshot);
router.put('/:id/verify-payment', protect, admin, verifyPayment);
router.put('/:id/reject-payment', protect, admin, rejectPayment);

module.exports = router;
