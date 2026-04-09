const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Define multiple routes and different HTTP methods
router.route('/')
    .get(getProducts)
    .post(createProduct);

// Dynamic routing with parameters
router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
