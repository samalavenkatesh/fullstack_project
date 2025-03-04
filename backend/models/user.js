const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile:{type: String, default : null},
  address : {type : String , default : null},
  password: { type: String, required: true },
  type: { type: String, enum: ['Farmer', 'Retailer'], required: true }, // Farmer or Retailer
  myEarnings : {type: Number, default :0 }
});

module.exports = mongoose.model('user', UserSchema);
