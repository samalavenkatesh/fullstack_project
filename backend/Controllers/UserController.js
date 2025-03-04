// Controllers/UserController.js
const User = require('../models/user');
const Order = require('../models/Order');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: "Profile loaded successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

const getMyDetails = async (req, res) => {
    const farmerId = req.body;
  try {
    const user = await User.findById(farmerId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: "Profile loaded successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email, address,mobile } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, address,mobile },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: "Profile updation success", updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

const getBuyerDetails = async (req, res) => {
    const {orderId}= req.params;
    const order = await Order.findById(orderId);
    const buyerId = order.buyer;
    try {
        const user = await User.findById(buyerId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: "Details loaded successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};


module.exports = {
    getProfile,
    updateProfile,
    getMyDetails,
    getBuyerDetails
};