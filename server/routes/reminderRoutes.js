const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  createReminder,
  getReminders,
  deleteReminder,
} = require('../controllers/reminderController');

const Reminder = require('../models/reminderModel');

// 📥 Create Reminder
router.post('/', auth, createReminder);

// 📤 Get Reminders for group
router.get('/', auth, getReminders);

// ❌ Delete Reminder
router.delete('/:id', auth, deleteReminder);

// 🔔 ✅ Get Upcoming Reminders for a group
router.get('/upcoming/:groupId', auth, async (req, res) => {
  const { groupId } = req.params;
  try {
    const upcomingReminders = await Reminder.find({
      group: groupId,
      dueDate: { $gte: new Date() },
    }).sort({ dueDate: 1 });

    res.json(upcomingReminders);
  } catch (error) {
    console.error('Failed to fetch upcoming reminders:', error);
    res.status(500).json({ message: 'Failed to fetch upcoming reminders' });
  }
});

module.exports = router;
