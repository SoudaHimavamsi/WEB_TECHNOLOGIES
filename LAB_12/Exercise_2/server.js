const express = require('express');

// Create a Node.js server using the Express.js framework
const app = express();

// 1. Log request details (method, URL, timestamp) using custom middleware function
const requestLogger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const timestamp = new Date().toISOString();
    
    // Display middleware execution results using console logging
    console.log(`[Global Middleware 1] => [${timestamp}] ${method} request to ${url}`);
    
    // Control request flow using the next() function in middleware
    next();
};

// 2. Handle request preprocessing using middleware-based request handling
const requestPreprocessor = (req, res, next) => {
    console.log(`[Global Middleware 2] => Preprocessing request headers...`);
    // Add custom property to request object to simulate preprocessing
    req.preprocessTime = new Date().getTime();
    next();
};

// Apply middleware globally using application-level middleware
app.use(requestLogger);
app.use(requestPreprocessor);

// Built-in middleware for JSON parsing
app.use(express.json()); 

// 3. Apply middleware to specific routes using route-level middleware
const requireAuth = (req, res, next) => {
    console.log(`[Route Middleware 1] => Checking User Authentication...`);
    
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader === 'Bearer secret-token') {
        req.user = { role: 'admin' };
        console.log(`[Route Middleware 1] => Authorized.`);
        next(); // Proceed to the next middleware or route handler
    } else {
        console.log(`[Route Middleware 1] => Blocked. Unauthorized.`);
        res.status(401).json({ message: 'Unauthorized execution' });
    }
};

// 4. Create multiple middleware layers using middleware chaining in Express
const validateAdmin = (req, res, next) => {
    console.log(`[Route Middleware 2] => Validating Admin role...`);
    if (req.user && req.user.role === 'admin') {
        console.log(`[Route Middleware 2] => Validation Passed.`);
        next();
    } else {
        console.log(`[Route Middleware 2] => Validation Failed. Forbidden.`);
        res.status(403).json({ message: 'Forbidden execution' });
    }
};

// Routes

// Public Route (Uses only application-level middleware)
app.get('/api/public', (req, res) => {
    console.log(`[Route Handler] => Executing /api/public`);
    res.json({ message: 'This route is public', preprocessedAt: req.preprocessTime });
});

// Protected Route (Applies specific route-level middleware)
app.get('/api/protected', requireAuth, (req, res) => {
    console.log(`[Route Handler] => Executing /api/protected`);
    res.json({ message: 'You have accessed the protected route!', preprocessedAt: req.preprocessTime });
});

// Admin Route (Demonstrates middleware chaining with multiple layers)
// The middleware executes in order: requireAuth -> validateAdmin -> route handler
app.get('/api/admin', requireAuth, validateAdmin, (req, res) => {
    console.log(`[Route Handler] => Executing /api/admin`);
    res.json({ message: 'Welcome to the admin dashboard.', preprocessedAt: req.preprocessTime });
});

// Using a different port than Exercise_1
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Middleware Exercise Server properly started.`);
});
