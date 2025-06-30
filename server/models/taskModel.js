// // const mongoose = require('mongoose');

// // const taskSchema = new mongoose.Schema({
//   //   title: { type: String, required: true },
//   //   description: String,
//   //   status: {
// //     type: String,
// //     enum: ['Todo', 'In Progress', 'In Review', 'Completed'],
// //     default: 'Todo'
// //   },
// //   priority: {
//   //     type: String,
//   //     enum: ['Low', 'Medium', 'High', 'Urgent'],
//   //     default: 'Medium'
//   //   },
//   //   dueDate: Date,
//   //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   //   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   //   category: String,
//   //   labels: [String],
//   //   group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
//   // }, { timestamps: true });
  
// // module.exports = mongoose.model('Task', taskSchema);



// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   status: {
//     type: String,
//     enum: ['Todo', 'In Progress', 'In Review', 'Completed'],
//     default: 'Todo',
//   },
//   priority: {
//     type: String,
//     enum: ['Low', 'Medium', 'High', 'Urgent'],
//     default: 'Medium',
//   },
//   dueDate: Date,
//   category: String,
//   labels: [String],

//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

//   group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // ✅ New line

// }, { timestamps: true });

// module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ['Todo', 'In Progress', 'In Review', 'Completed'],
      default: 'Todo',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    dueDate: Date,

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // 🔥 MUST HAVE THIS LINE

    category: String,
    labels: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
