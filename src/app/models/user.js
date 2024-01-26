const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  role: { type: String, enum: ['administrateur', 'standard'], default: 'standard' },
  isActive: { type: Boolean, default: true },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("UserModel", userSchema);
