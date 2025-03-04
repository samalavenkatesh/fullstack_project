const router = require('express').Router();
const { getAllProducts, buyProduct, getMyOrders } = require('../Controllers/RetailerController');
const ensureAuthenticated = require('../Middlewares/Auth');

router.get('/products', ensureAuthenticated, getAllProducts);
router.post('/buy-product/:productId', ensureAuthenticated, buyProduct);
router.get('/my-orders', ensureAuthenticated, getMyOrders);


module.exports = router;