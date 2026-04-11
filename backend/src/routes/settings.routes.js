const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

// Since this is MVP, these are public for ease of integration
// In a true secure environment, you'd apply const { protect, authorize } = require('../middlewares/auth.middleware');
router.get('/', settingsController.getSettings);
router.put('/', settingsController.updateSettings);

module.exports = router;
