const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware');
const { upload, cloudinary } = require('../utils/cloudinary');

// Public upload — for payment screenshots (no auth required)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400); throw new Error('No image file provided');
  }
  res.json({ 
    success: true, 
    imageUrl: req.file.path, 
    publicId: req.file.filename,
    message: 'Image uploaded successfully'
  });
});

// Admin-only upload — for product/category images
router.post('/image', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400); throw new Error('No image file provided');
  }
  res.json({ 
    success: true, 
    imageUrl: req.file.path, 
    publicId: req.file.filename,
    message: 'Image uploaded successfully'
  });
});

router.delete('/image', protect, admin, async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) {
    res.status(400); throw new Error('publicId is required');
  }
  await cloudinary.uploader.destroy(publicId);
  res.json({ success: true, message: 'Image deleted from cloud storage' });
});

module.exports = router;
