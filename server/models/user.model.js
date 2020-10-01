const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 6,
    // select: false
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;