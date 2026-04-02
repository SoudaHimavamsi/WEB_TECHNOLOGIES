const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/bookfinderdb';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.log('Database connection error: ', err));

// Database Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

// API Endpoints
// 1. Pagination - Load initial and "Load More" books
app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const books = await Book.find().skip(skip).limit(limit);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Search Books by Title
app.get('/books/search', async (req, res) => {
    try {
        const title = req.query.title;
        const books = await Book.find({ title: { $regex: title, $options: "i" } });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Filter by Category
app.get('/books/category/:category', async (req, res) => {
    try {
        const cat = req.params.category;
        const books = await Book.find({ category: { $regex: new RegExp(`^${cat}$`, "i") } });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Sort Books
app.get('/books/sort/:field', async (req, res) => {
    try {
        const field = req.params.field;
        let sortQuery = field === 'price' ? { price: 1 } : { rating: -1 };
        const books = await Book.find().sort(sortQuery);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Top Rated
app.get('/books/top', async (req, res) => {
    try {
        const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));