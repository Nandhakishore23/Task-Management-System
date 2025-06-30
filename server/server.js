const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const groupRoutes = require('./routes/groupRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/reminders', reminderRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(err => console.error(err));
