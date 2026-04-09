const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Manage database connection using connection handling in Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lab12_exercise3');
        console.log('MongoDB connection established successfully.');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

connectDB();

// Handle asynchronous database operations using async/await in Node.js
// Insert data into the database using create() or save() methods
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        // Using create() method
        const newUser = await User.create({ name, email, age });
        
        // Return database responses through API using Express response handling
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve data using find() method
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve single user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update records using updateOne() or findByIdAndUpdate()
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        // Using findByIdAndUpdate() method
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete records using deleteOne() or findByIdAndDelete()
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Using findByIdAndDelete() method
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Use port 5002 so it doesn't conflict with Exercise_1 or 2
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
