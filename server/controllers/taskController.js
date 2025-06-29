const Task = require('../models/taskModel');

// 📥 Create Task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📤 Get All Tasks (Filter + Search)
exports.getTasks = async (req, res) => {
    try {
        const { status, priority, category, search, group } = req.query;
        const query = { createdBy: req.user._id };

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (category) query.category = category;
        if (group) query.group = group;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const tasks = await Task.find(query).populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📑 Get Single Task
exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, createdBy: req.user._id })
            .populate('assignedTo', 'name email');
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✍️ Update Task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
