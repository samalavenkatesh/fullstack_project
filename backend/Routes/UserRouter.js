const router = require('express').Router();
const { getProfile, updateProfile, getMyDetails,getBuyerDetails } = require('../Controllers/UserController');
const ensureAuthenticated = require('../Middlewares/Auth');
// Define routes
router.get('/view', ensureAuthenticated, getProfile);
router.put('/update', ensureAuthenticated, updateProfile);
router.put('/details', ensureAuthenticated, getMyDetails);
router.get('/buyer-details/:orderId', ensureAuthenticated, getBuyerDetails);

module.exports = router; // Ensure this is included
