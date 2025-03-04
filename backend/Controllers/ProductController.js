const Product = require('../models/Product');
const User = require('../models/user')


exports.getProductDetails = async (req, res) => {

    const {productId} = req.params;
    try {
        const product = await Product.findById(productId);
        const farmer = await User.findById(product.farmer)
        // console.log('Products retrieved:', products);
        res.status(200).json({message : "Product found successfully",product: product,farmer : farmer}); // Ensure products are sent as an object with `products` key
      } catch (error) {
    // console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};