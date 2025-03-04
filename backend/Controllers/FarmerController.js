const User = require('../models/user');
const Product = require('../models/Product');
const Order = require('../models/Order'); // Ensure Order model is required if used in manageOrder

// Fetch products listed by the farmer
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ farmer : req.user._id });
    // const product = await Product.findOne({farmer : req.user._id});
    const farmerDetails =await User.findById(req.user._id);
    res.status(200).json({ success: true, products ,farmerDetails : farmerDetails});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products!', error: err.message });
  }
};


// Update a product
exports.updateProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, quantity, category,description } = req.body;
  
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: productId, farmer: req.user._id },
        { name, price, quantity, category ,description },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found or unauthorized!' });
      }
  
      res.status(200).json({ success: true, message: 'Product updated successfully!', product: updatedProduct });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to update product!', error: err.message });
    }
  };
  
  // Delete a product
  exports.deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const deletedProduct = await Product.findOneAndDelete({
        _id: productId,
        farmer: req.user._id,
      });
  
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found or unauthorized!' });
      }
  
      res.status(200).json({ success: true, message: 'Product deleted successfully!' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to delete product!', error: err.message });
    }
  };

// Get orders for the logged-in farmer
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id });
    
    // const buyerId = orders.buyer; 
    // const buyer = await User.findById(buyerId);
    // const buyerName = buyer.username;

    res.status(200).json({ success: true,orders : orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders!', error: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
        const { productName, price, quantity, category,description } = req.body;
        if (!productName || !price || !quantity || !category || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required!' });
        }
        const product = new Product({
            name: productName,
            price,
            quantity,
            category,
            description,
            farmer: req.user._id, // Assuming farmer ID is in the JWT token
        });

        await product.save();

    res.status(201).json({ success: true, message: 'Product added successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error in fc !', error: err });
  }
};

// Accept or reject an order
exports.manageOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // 'Accepted' or 'Rejected'
    
    const order = await Order.findById(orderId);

    // change remaining quantity of products if order rejected
    if(status === "Rejected"){
        const productId = order.product;
        const orderQunatity = order.quantity;
        // const buyerId = order.buyer;
        // const user = await user.findById(buyerId);
        const product = await Product.findById(productId);
        product.quantity += orderQunatity;
        await product.save();
    }
    if(status === "Accepted"){
        const productId = order.product;
        const product = await Product.findById(productId);
        const orderQunatity = order.quantity;
        const earnings = (orderQunatity) * (product.price);
        const user = await User.findById(order.farmer);
        user.myEarnings += earnings; 
        await user.save();
    }

    if (!order) return res.status(404).json({ success: false, message: 'Order not found!'});

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: `Order ${status} successfully!` });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update order status!', error: err.message });
  }
};

exports.getMySales = async (req, res) => {
    try {
      // Fetch all products listed by the farmer
      const products = await Product.find({ farmer: req.user._id });
  
      // Fetch all orders for the farmer's products
      const orders = await Order.find({ farmer: req.user._id });
  
      // Current date and 7 days ago
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
  
      // Map over each product to calculate its weekly sales data
      const salesData = products.map((product) => {
        // Filter orders related to the current product
        const productOrders = orders.filter(
          (order) => order.product.toString() === product._id.toString()
        );
  
        // Initialize an array of 7 days for daily sales
        const weeklySales = Array(7).fill(0);
  
        productOrders.forEach((order) => {
          // Ensure `createdAt` exists and is a valid date
          if (order.createdAt) {
            const orderDate = new Date(order.createdAt);
            if (orderDate >= lastWeek && orderDate <= today) {
              // Calculate the day index (0 for today, 6 for 7 days ago)
              const dayIndex = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
              if (dayIndex >= 0 && dayIndex < 7) {
                weeklySales[6 - dayIndex] += order.quantity; // Reverse index for chronological order
              }
            }
          }
        });
  
        return {
          productId: product._id,
          name: product.name,
          weeklySales, // Array showing sales for the last 7 days
        };
      });
  
      // Respond with calculated sales data
      res.status(200).json({ success: true, salesData });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch sales data!',
        error: err.message,
      });
    }
  };
  