const router = require('express').Router();
const { getProductDetails } = require('../Controllers/ProductController');
const ensureAuthenticated = require('../Middlewares/Auth');



router.get("/:productId",ensureAuthenticated,getProductDetails);

module.exports = router;