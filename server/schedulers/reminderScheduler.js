const cron = require('node-cron');
const Reminder = require('../models/reminderModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const dayjs = require('dayjs');

// ⏰ Run every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('🔔 Running Reminder Email Scheduler...');

  const tomorrow = dayjs().add(1, 'day').startOf('day');
  const dayAfterTomorrow = tomorrow.add(1, 'day');

  try {
    const reminders = await Reminder.find({
      dueDate: {
        $gte: tomorrow.toDate(),
        $lt: dayAfterTomorrow.toDate(),
      },
    }).populate('createdBy', 'email name');

    if (reminders.length === 0) {
      console.log('✅ No reminders due tomorrow.');
      return;
    }

    for (const reminder of reminders) {
      const user = reminder.createdBy;
      const subject = `Reminder: ${reminder.title} is due tomorrow!`;
      const html = `
        <h3>Hello ${user.name},</h3>
        <p>This is a reminder for:</p>
        <p><strong>${reminder.title}</strong></p>
        <p>Due on: ${new Date(reminder.dueDate).toLocaleString()}</p>
        <br/>
        <p>— Task Manager App</p>
      `;

      await sendEmail(user.email, subject, html);
      console.log(`📧 Email sent to ${user.email} for "${reminder.title}"`);
    }
  } catch (error) {
    console.error('❌ Error sending reminder emails:', error);
  }
});
