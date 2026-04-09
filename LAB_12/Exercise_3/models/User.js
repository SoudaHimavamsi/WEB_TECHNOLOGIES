const mongoose = require('mongoose');

// Use an ODM like Mongoose for schema modeling
// Define a schema using Mongoose schema definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Create a model using Mongoose model creation
const User = mongoose.model('User', userSchema);

module.exports = User;
