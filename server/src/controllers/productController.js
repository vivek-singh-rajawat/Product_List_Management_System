const Product = require('../models/productModel');

// Add product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    console.log('Product created:', product);
    res.status(201).json(product);
  } catch (error) {
    console.log("Error adding product:", error);
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get products
exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;  
    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    });
  } catch (error) {
    next(error);
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  console.log('Updating product with ID:', req.params.id);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(`Deleted product with ID: ${req.params.id}`);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.log("Error deleting product:", error);
    res.status(400).json({ message: 'Error deleting product', error });
  }
};
