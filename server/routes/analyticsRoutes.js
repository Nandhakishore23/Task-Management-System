const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTaskCompletionHeatmap,getProductivityStats, } = require('../controllers/analyticsController');

// Heatmap endpoint
router.get('/heatmap', auth, getTaskCompletionHeatmap);
router.get('/stats', auth, getProductivityStats); 
module.exports = router;
