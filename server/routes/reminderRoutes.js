const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // ✅ Correct folder name
const {
  createReminder,
  getReminders,
  deleteReminder
} = require('../controllers/reminderController');

// 📥 Create Reminder
router.post('/', auth, createReminder);

// 📤 Get Reminders for group
router.get('/', auth, getReminders);

// ❌ Delete Reminder
router.delete('/:id', auth, deleteReminder);

module.exports = router;
