const Reminder = require('../models/reminderModel');

// 📥 Create Reminder
exports.createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📤 Get Reminders (by group)
exports.getReminders = async (req, res) => {
  try {
    const { group } = req.query;
    const reminders = await Reminder.find({
      group,
      createdBy: req.user._id,
    });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete Reminder
exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
