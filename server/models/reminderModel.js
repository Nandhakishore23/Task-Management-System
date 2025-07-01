// const mongoose = require('mongoose');

// const reminderSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     dueDate: { type: Date, required: true },
//     group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Reminder', reminderSchema);


const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isMailSent: { type: Boolean, default: false }, // ✅ Add this
});

module.exports = mongoose.model('Reminder', reminderSchema);
