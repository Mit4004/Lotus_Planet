const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { 
    name: String, 
    email: String, 
    phone: String 
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    image: String,
    price: Number,
    size: String,
    quantity: Number
  }],
  address: {
    fullName: String,
    phone: String,
    house: String,
    street: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String
  },
  subtotal: Number,
  shippingCharge: Number,
  total: Number,
  paymentMethod: { type: String, enum: ['UPI', 'COD'] },
  paymentStatus: { type: String, enum: ['Pending', 'Pending Verification', 'Verified', 'Rejected'], default: 'Pending' },
  upiTransactionId: String,
  paymentScreenshot: { url: String, publicId: String },
  orderStatus: { 
    type: String, 
    enum: ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String
  }]
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (this.isModified('orderStatus')) {
    this.statusHistory.push({
      status: this.orderStatus,
      note: `Order status updated to ${this.orderStatus}`
    });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
