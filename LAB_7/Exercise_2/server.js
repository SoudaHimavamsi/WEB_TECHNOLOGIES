const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to a new database for books
// --- DATABASE LINKING CODE ---
const mongoURI = 'mongodb://127.0.0.1:27017/bookfinderdb'; // Points to your local MongoDB

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => console.log('Database connection error: ', err));

// Database Structure Collection: books [cite: 47]
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

// --- API ENDPOINTS ---

// 1. Search Books by Title [cite: 51]
app.get('/books/search', async (req, res) => {
    try {
        const searchQuery = req.query.title; // GET /books/search?title=... [cite: 53]
        // db.books.find({title:{$regex:"...",$options:"i"}}) [cite: 55]
        const books = await Book.find({ title: { $regex: searchQuery, $options: "i" } });
        res.json(books); // Returns JSON results [cite: 56]
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Filter Books by Category [cite: 57]
app.get('/books/category/:category', async (req, res) => {
    try {
        const cat = req.params.category; // e.g., /books/category/programming [cite: 59]
        // db.books.find({category:"Programming"}) (using regex for case-insensitivity) [cite: 61]
        const books = await Book.find({ category: { $regex: new RegExp(`^${cat}$`, "i") } });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Sort Books [cite: 62]
app.get('/books/sort/:field', async (req, res) => {
    try {
        const field = req.params.field; // GET /books/sort/price [cite: 65]
        let sortQuery = {};
        if (field === 'price') sortQuery = { price: 1 }; // db.books.find().sort({price:1}) [cite: 67]
        if (field === 'rating') sortQuery = { rating: -1 }; // db.books.find().sort({rating:-1}) [cite: 69]
        
        const books = await Book.find().sort(sortQuery);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Top Rated Books [cite: 70]
app.get('/books/top', async (req, res) => {
    try {
        // GET /books/top [cite: 72] -> db.books.find({rating:{$gte:4}}).limit(5) [cite: 74]
        const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Pagination (Get all books with pages) [cite: 75]
app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // GET /books?page=2 [cite: 77]
        const limit = 5;
        const skip = (page - 1) * limit; 
        
        // db.books.find().skip(5).limit(5) [cite: 79]
        const books = await Book.find().skip(skip).limit(limit);
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));