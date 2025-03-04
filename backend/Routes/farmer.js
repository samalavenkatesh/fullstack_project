const router = require('express').Router();
const {
  addProduct,
  getMyProducts,
  manageOrder,
  getMyOrders,
  updateProduct,
  deleteProduct,
  getMySales,
} = require('../Controllers/FarmerController');
const ensureAuthenticated = require('../Middlewares/Auth');

// Add a new product
router.post('/add-product', ensureAuthenticated, addProduct);

// View all products listed by the farmer
router.get('/my-products', ensureAuthenticated, getMyProducts);

// Update a product by ID
router.put('/products/:productId', ensureAuthenticated, updateProduct);

// Delete a product by ID
router.delete('/products/:productId', ensureAuthenticated, deleteProduct);

// Manage orders (accept/reject)
router.patch('/manage-order/:orderId', ensureAuthenticated, manageOrder);

// Get orders for the logged-in farmer
router.get('/my-orders', ensureAuthenticated, getMyOrders);

// Get my sales info 
router.get('/sales-data', ensureAuthenticated, getMySales);

module.exports = router;
