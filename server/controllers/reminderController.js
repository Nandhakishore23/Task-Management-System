// // const Reminder = require('../models/reminderModel');

// // // 📥 Create Reminder
// // exports.createReminder = async (req, res) => {
// //   try {
// //     const reminder = await Reminder.create({
// //       ...req.body,
// //       createdBy: req.user._id,
// //     });
// //     res.status(201).json(reminder);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // 📤 Get Reminders (by group)
// // exports.getReminders = async (req, res) => {
// //   try {
// //     const { group } = req.query;
// //     const reminders = await Reminder.find({
// //       group,
// //       createdBy: req.user._id,
// //     });
// //     res.json(reminders);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // // ❌ Delete Reminder
// // exports.deleteReminder = async (req, res) => {
// //   try {
// //     const reminder = await Reminder.findOneAndDelete({
// //       _id: req.params.id,
// //       createdBy: req.user._id,
// //     });
// //     if (!reminder) {
// //       return res.status(404).json({ message: 'Reminder not found' });
// //     }
// //     res.json({ message: 'Reminder deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // };


// const Reminder = require('../models/reminderModel');
// // const ReminderLog = require('../models/reminderLogModel');
// const sendEmail = require('../utils/email');

// // 📥 Create Reminder
// exports.createReminder = async (req, res) => {
//   try {
//     const reminder = await Reminder.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });

//     // ✅ Check if due date is within 24 hours
//     const now = new Date();
//     const due = new Date(reminder.dueDate);
//     const timeDiff = due.getTime() - now.getTime();
//     const oneDayMs = 24 * 60 * 60 * 1000;

//     if (timeDiff <= oneDayMs && timeDiff >= 0) {
//       const userEmail = req.user.email;
//       const subject = `Reminder: "${reminder.title}" is due within a day!`;
//       const html = `
//         <h3>Hello ${req.user.name},</h3>
//         <p>This is your reminder for:</p>
//         <p><strong>${reminder.title}</strong></p>
//         <p>Due Date: ${due.toLocaleString()}</p>
//         <br/>
//         <p>From: Task Manager App</p>
//       `;

//       try {
//         await sendEmail(userEmail, subject, html);
//         await ReminderLog.create({
//           reminderId: reminder._id,
//           email: userEmail,
//           status: 'Sent',
//           message: 'Email sent successfully on creation',
//         });

//         console.log(`✅ Email sent to ${userEmail}`);
//       } catch (emailError) {
//         await ReminderLog.create({
//           reminderId: reminder._id,
//           email: userEmail,
//           status: 'Failed',
//           message: emailError.message,
//         });

//         console.error(`❌ Failed to send email to ${userEmail}`, emailError);
//       }
//     }

//     res.status(201).json(reminder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 📤 Get Reminders (by group)
// exports.getReminders = async (req, res) => {
//   try {
//     const { group } = req.query;
//     const reminders = await Reminder.find({
//       group,
//       createdBy: req.user._id,
//     });
//     res.json(reminders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ❌ Delete Reminder
// exports.deleteReminder = async (req, res) => {
//   try {
//     const reminder = await Reminder.findOneAndDelete({
//       _id: req.params.id,
//       createdBy: req.user._id,
//     });
//     if (!reminder) {
//       return res.status(404).json({ message: 'Reminder not found' });
//     }
//     res.json({ message: 'Reminder deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Reminder = require('../models/reminderModel');
const sendEmail = require('../utils/email');

// 📥 Create Reminder
exports.createReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      createdBy: req.user._id,
    });

    // ✅ Check if due date is within 24 hours
    const now = new Date();
    const due = new Date(reminder.dueDate);
    const timeDiff = due.getTime() - now.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    if (timeDiff <= oneDayMs && timeDiff >= 0) {
      const userEmail = req.user.email;
      const subject = `⏰ Reminder: "${reminder.title}" is due within 24 hours!`;
      const html = `
        <h3>Hello ${req.user.name},</h3>
        <p>This is your reminder for:</p>
        <p><strong>${reminder.title}</strong></p>
        <p>📅 Due Date: ${due.toLocaleString()}</p>
        <br/>
        <p>✅ From: Task Manager App</p>
      `;

      try {
        await sendEmail(userEmail, subject, html);
        console.log(`✅ Email sent to ${userEmail}`);
      } catch (emailError) {
        console.error(`❌ Failed to send email to ${userEmail}`, emailError);
      }
    }

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
