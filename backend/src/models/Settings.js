const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  shopName: { type: String, default: 'LotusPlanet' },
  tagline: { type: String, default: 'Where Every Corner Blooms' },
  slidingText: { type: String, default: 'Indoor Plants • Outdoor Plants • Succulents • Flowering Plants • Herbs • Rare & Exotic • Free Delivery above ₹500 • ' },
  upiId: { type: String, default: 'lotusplanet@upi' },
  upiQrCode: { type: String, default: '' },
  whatsapp: { type: String, default: '+91 98765 43210' },
  email: { type: String, default: 'hello@lotusplanet.in' },
  address: { type: String, default: '123 Green Avenue, Botanic Sector, New Delhi' },
  shippingCharge: { type: Number, default: 50 },
  freeShippingAbove: { type: Number, default: 500 },
  expressCharge: { type: Number, default: 150 },
  instagram: { type: String, default: 'https://instagram.com/lotusplanet' },
  facebook: { type: String, default: 'https://facebook.com/lotusplanet' },
  visuals: {
    hero1: { type: String },
    hero2: { type: String },
    hero3: { type: String },
    cat1: { type: String },
    cat2: { type: String },
    cat3: { type: String },
    cat4: { type: String },
    cat5: { type: String },
    cat6: { type: String },
    sea1: { type: String },
    sea2: { type: String },
    sea3: { type: String },
    about: { type: String },
    gal1: { type: String },
    gal2: { type: String },
    gal3: { type: String },
    gal4: { type: String },
    gal5: { type: String },
    gal6: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
