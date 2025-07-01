const Task = require('../models/taskModel');
const dayjs = require('dayjs');

exports.getTaskCompletionHeatmap = async (req, res) => {
  try {
    const { group } = req.query;

    if (!group) {
      return res.status(400).json({ message: 'Group ID is required' });
    }

    const tasks = await Task.find({
      group,
      createdBy: req.user._id,
      status: 'Completed',
    });

    const heatmapData = {};

    tasks.forEach(task => {
      const date = new Date(task.updatedAt).toISOString().split('T')[0]; // YYYY-MM-DD
      heatmapData[date] = (heatmapData[date] || 0) + 1;
    });

    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductivityStats = async (req, res) => {
  try {
    const { group } = req.query;
    if (!group) return res.status(400).json({ message: 'Group ID required' });

    const tasks = await Task.find({
      group,
      createdBy: req.user._id,
    });

    const stats = {
      monthlyCompleted: {}, // { '2025-06': 5 }
      overdueCount: 0,
      totalTasks: tasks.length,
      completedTasks: 0,
    };

    const today = dayjs();

    tasks.forEach((task) => {
      const month = dayjs(task.updatedAt).format('YYYY-MM');
      if (task.status === 'Completed') {
        stats.monthlyCompleted[month] = (stats.monthlyCompleted[month] || 0) + 1;
        stats.completedTasks += 1;
      }

      if (task.dueDate && dayjs(task.dueDate).isBefore(today) && task.status !== 'Completed') {
        stats.overdueCount += 1;
      }
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};