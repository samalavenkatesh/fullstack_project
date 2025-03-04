// controllers/ReviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/user');

exports.submitReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  try {
    const userId = req.user._id; // Assuming user._id is set in a middleware for authentication
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = new Review({
      product: productId,
      user: userId,
      username : user.username ,
      rating,
      comment,
    });

    await review.save();

     // Ensure the `reviews` field exists before pushing
     if (!product.reviews) {
        product.reviews = [];
      }

      if(product.reviewsCount>0){
          const previousCount = product.reviewsCount;
          product.reviewsCount +=1;
          const previousRating = product.rating;
          const newPrevious = (previousRating*previousCount)/product.reviewsCount;
          const newRating = rating/(product.reviewsCount);
          product.rating = newPrevious + newRating;
      }
      else{
        product.rating = rating;
        product.reviewsCount += 1;///
      }


    // Add the review to the product's review array
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getReviews =  async (req, res) => {
    try {
      const { productId } = req.params;
      const reviews = await Review.find({ product: productId });

      res.status(200).json({ reviews });
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews", error });
    }
};
  
