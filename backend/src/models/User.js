const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  label: String,
  fullName: String,
  phone: String,
  house: String,
  street: String,
  landmark: String,
  city: String,
  state: String,
  pincode: String,
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  addresses: [addressSchema],
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
