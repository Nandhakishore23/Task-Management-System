// // // const Reminder = require('../models/reminderModel');
// // // const User = require('../models/userModel');
// // // const sendEmail = require('../utils/email');

// // // const checkAndSendReminders = async () => {
// // //   const now = new Date();

// // //   const reminders = await Reminder.find({
// // //     dueDate: { $lte: now },
// // //   }).populate('createdBy', 'email name');

// // //   for (const reminder of reminders) {
// // //     try {
// // //       const userEmail = reminder.createdBy.email;
// // //       const subject = `Reminder: ${reminder.title}`;
// // //       const html = `
// // //         <h3>Hello ${reminder.createdBy.name},</h3>
// // //         <p>This is your reminder for:</p>
// // //         <p><strong>${reminder.title}</strong></p>
// // //         <p>${reminder.description}</p>
// // //         <p>Due Date: ${new Date(reminder.dueDate).toDateString()}</p>
// // //         <br/>
// // //         <p>Task Manager App</p>
// // //       `;

// // //       await sendEmail(userEmail, subject, html);
// // //       console.log(`Reminder email sent to ${userEmail}`);
// // //     } catch (error) {
// // //       console.error(`Failed to send email to ${reminder.createdBy.email}`, error);
// // //     }
// // //   }
// // // };

// // // module.exports = checkAndSendReminders;


// // const Reminder = require('../models/reminderModel');
// // const User = require('../models/userModel');
// // const sendEmail = require('../utils/email');

// // const checkAndSendReminders = async () => {
// //   const now = new Date();
// //   const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

// //   const reminders = await Reminder.find({
// //     dueDate: {
// //       $gte: now,
// //       $lte: next24Hours, // Due within next 24 hours
// //     },
// //   }).populate('createdBy', 'email name');

// //   for (const reminder of reminders) {
// //     try {
// //       const userEmail = reminder.createdBy.email;
// //       const subject = `🔔 Reminder: ${reminder.title} is due soon!`;
// //       const html = `
// //         <h3>Hi ${reminder.createdBy.name},</h3>
// //         <p>This is a reminder for:</p>
// //         <p><strong>${reminder.title}</strong></p>
// //         <p>Due Date: <strong>${new Date(reminder.dueDate).toLocaleString()}</strong></p>
// //         <br/>
// //         <p>✔️ Please ensure to complete it on time.</p>
// //         <p>Task Management System</p>
// //       `;

// //       await sendEmail(userEmail, subject, html);
// //       console.log(`✅ Reminder email sent to ${userEmail}`);
// //     } catch (error) {
// //       console.error(`❌ Failed to send email to ${reminder.createdBy.email}`, error);
// //     }
// //   }
// // };

// // module.exports = checkAndSendReminders;


// const Reminder = require('../models/reminderModel');
// const User = require('../models/userModel');
// const sendEmail = require('../utils/email');

// const checkAndSendReminders = async () => {
//   const now = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(now.getDate() + 1);

//   const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
//   const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

//   const reminders = await Reminder.find({
//     dueDate: { $gte: startOfTomorrow, $lte: endOfTomorrow }
//   }).populate('createdBy', 'email name');

//   for (const reminder of reminders) {
//     try {
//       const userEmail = reminder.createdBy.email;
//       const subject = `Reminder: ${reminder.title} is due tomorrow!`;
//       const html = `
//         <h3>Hello ${reminder.createdBy.name},</h3>
//         <p>This is a reminder for:</p>
//         <p><strong>${reminder.title}</strong></p>
//         <p>Due on: ${new Date(reminder.dueDate).toLocaleString()}</p>
//         <br/>
//         <p>From: Task Manager App</p>
//       `;

//       await sendEmail(userEmail, subject, html);
//       console.log(`Reminder email sent to ${userEmail}`);
//     } catch (error) {
//       console.error(`Failed to send email to ${reminder.createdBy.email}`, error);
//     }
//   }
// };

// module.exports = checkAndSendReminders;


// const Reminder = require('../models/reminderModel');
// // const ReminderLog = require('../models/reminderLogModel');
// const User = require('../models/userModel');
// const sendEmail = require('../utils/email');
// const dayjs = require('dayjs');

// const checkAndSendReminders = async () => {
//   const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();
//   const dayAfter = dayjs().add(2, 'day').startOf('day').toDate();

//   const reminders = await Reminder.find({
//     dueDate: { $gte: tomorrow, $lt: dayAfter },
//   }).populate('createdBy', 'email name');

//   for (const reminder of reminders) {
//     try {
//       const userEmail = reminder.createdBy.email;
//       const subject = `Reminder: ${reminder.title} is due tomorrow!`;
//       const html = `
//         <h3>Hello ${reminder.createdBy.name},</h3>
//         <p>This is a reminder for:</p>
//         <p><strong>${reminder.title}</strong></p>
//         <p>Due on: ${new Date(reminder.dueDate).toLocaleString()}</p>
//         <br/>
//         <p>From: Task Manager App</p>
//       `;

//       await sendEmail(userEmail, subject, html);
//       await ReminderLog.create({
//         reminderId: reminder._id,
//         email: userEmail,
//         status: 'Sent',
//         message: 'Email sent successfully',
//       });

//       console.log(`✅ Reminder email sent to ${userEmail}`);
//     } catch (error) {
//       await ReminderLog.create({
//         reminderId: reminder._id,
//         email: reminder.createdBy.email,
//         status: 'Failed',
//         message: error.message,
//       });

//       console.error(`❌ Failed to send email to ${reminder.createdBy.email}`, error);
//     }
//   }
// };

// module.exports = checkAndSendReminders;


const Reminder = require('../models/reminderModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const dayjs = require('dayjs');

const checkAndSendReminders = async () => {
  const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();
  const dayAfter = dayjs().add(2, 'day').startOf('day').toDate();

  const reminders = await Reminder.find({
    dueDate: { $gte: tomorrow, $lt: dayAfter },
  }).populate('createdBy', 'email name');

  for (const reminder of reminders) {
    try {
      const userEmail = reminder.createdBy.email;
      const subject = `⏰ Reminder: "${reminder.title}" is due tomorrow!`;
      const html = `
        <h3>Hello ${reminder.createdBy.name},</h3>
        <p>This is a reminder for:</p>
        <p><strong>${reminder.title}</strong></p>
        <p>📅 Due on: ${new Date(reminder.dueDate).toLocaleString()}</p>
        <br/>
        <p>✅ From: Task Manager App</p>
      `;

      await sendEmail(userEmail, subject, html);
      console.log(`✅ Reminder email sent to ${userEmail}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${reminder.createdBy.email}:`, error);
    }
  }
};

module.exports = checkAndSendReminders;
