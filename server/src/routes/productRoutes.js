const express = require('express');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { validateProduct } = require('../middlewares/joiValidation');
const router = express.Router();

// Routes
router.post('/add-product', validateProduct, addProduct);  // Add a product
router.get('/', getProducts);                  // Get list of products
router.patch('/edit-product/:id', updateProduct); // Edit a product
router.delete('/delete-product/:id', deleteProduct);           // Delete a product
router.post('/file-upload',  addProduct);   // Route to add a product with an attached file

module.exports = router;
