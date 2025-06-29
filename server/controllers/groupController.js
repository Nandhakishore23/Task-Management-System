const Group = require('../models/groupModel');
const User = require('../models/userModel');

// ➕ Create Group
exports.createGroup = async (req, res) => {
    try {
        const group = await Group.create({
            name: req.body.name,
            description: req.body.description,
            creator: req.user._id,
            members: [req.user._id] // Creator is also a member
        });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📄 Get All Groups user is a member of
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user._id });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔍 Get Single Group Details
exports.getGroup = async (req, res) => {
    try {
        const group = await Group.findOne({
            _id: req.params.id,
            members: req.user._id
        }).populate('members', 'name email');
        
        if (!group) return res.status(404).json({ message: 'Group not found' });

        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➕ Add Member to Group (by User ID for now)
exports.addMember = async (req, res) => {
    try {
        const group = await Group.findOne({
            _id: req.params.id,
            creator: req.user._id // Only creator can add
        });

        if (!group) return res.status(404).json({ message: 'Group not found or no permission' });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (group.members.includes(user._id)) {
            return res.status(400).json({ message: 'User already in group' });
        }

        group.members.push(user._id);
        await group.save();

        res.json({ message: 'Member added', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ Remove Member from Group
exports.removeMember = async (req, res) => {
    try {
        const group = await Group.findOne({
            _id: req.params.id,
            creator: req.user._id
        });

        if (!group) return res.status(404).json({ message: 'Group not found or no permission' });

        group.members = group.members.filter(
            (id) => id.toString() !== req.body.userId
        );

        await group.save();

        res.json({ message: 'Member removed', group });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
