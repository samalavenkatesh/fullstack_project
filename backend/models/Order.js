const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name:{type : String , required : true},
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Farmer who listed the product
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Retailer who placed the order
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
