const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serves frontend files

// --- LINKING THE DATABASE ---
// Replace 'YOUR_MONGODB_URI' with your actual MongoDB Atlas connection string, 
// or use the local one provided below.
const mongoURI = 'mongodb://127.0.0.1:27017/notesdb'; 
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.log('Database connection error: ', err));

// --- MONGODB SCHEMA ---
const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// --- API ENDPOINTS ---

// 1. Add Note (POST)
app.post('/notes', async (req, res) => {
    try {
        const newNote = new Note(req.body);
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add note' });
    }
});

// 2. View Notes (GET)
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// 3. Update Note (PUT)
app.put('/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { $set: { title: req.body.title, description: req.body.description } }, // Student can modify title or description [cite: 28]
            { new: true }
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});

// 4. Delete Note (DELETE)
app.delete('/notes/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));