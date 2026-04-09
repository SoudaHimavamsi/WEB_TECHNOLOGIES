// In-memory data store for simplicity
let products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 499.99 }
];

// @desc    Get all products
// @route   GET /api/products
const getProducts = (req, res) => {
    res.json(products);
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ message: 'Please include a name and price' });
    }

    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(productIndex, 1);
    res.json({ message: 'Product removed successfully' });
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
