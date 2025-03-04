const Product = require('../models/Product');
const Order = require('../models/Order');

// Get all products listed by farmers
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // console.log('Products retrieved:', products);
        res.json(products); // Ensure products are sent as an object with `products` key
      } catch (error) {
    // console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products 123' });
  }
};

// Buy a product
exports.buyProduct = async (req, res) => {
  if (req.user.type !== 'Retailer') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { productId } = req.params;
  const {quantity} = req.body;

  try {
    const product = await Product.findById(productId);
    const farmerId = product.farmer;

    if (!product || product.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock or product not found' });
    }

    const totalAmount = product.price * quantity;

    // Create an order
    const order = new Order({
        name :product.name,
        farmer : farmerId,
        buyer: req.user._id,
        product: productId,
        quantity,
        totalAmount,
    });
    await order.save();

    // Deduct quantity from the product
    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View retailer's orders
exports.getMyOrders = async (req, res) => {
  if (req.user.type !== 'Retailer') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const orders = await Order.find({ buyer: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
