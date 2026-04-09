const express = require('express');

// Initialize the application using express() instance creation
const app = express();

// Parse incoming JSON data using express.json() middleware
app.use(express.json());

// Routes
// Maintain modular structure using separation of routes and logic
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test API at http://localhost:${PORT}/api/products`);
});
