const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const FarmerRouter = require('./Routes/farmer'); // Add farmer routes
const RetailerRouter = require('./Routes/retailer'); // Add retailer routes
const ProfileRouter = require('./Routes/UserRouter'); // Add retailer routes
const ProductRouter = require('./Routes/ProductRouter'); // Add retailer routes
const ReviewRouter = require('./Routes/ReviewRouter');


require('dotenv').config();
require('./models/db.js'); // Initialize database connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', AuthRouter); // Authentication routes
app.use('/farmer', FarmerRouter); // Farmer-specific routes
app.use('/retailer', RetailerRouter); // Retailer-specific routes
app.use('/profile', ProfileRouter); // Retailer-specific routes
app.use('/product', ProductRouter); // Retailer-specific routes
app.use('/seller', ProfileRouter); // Retailer-specific routes
app.use('/review', ReviewRouter);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
