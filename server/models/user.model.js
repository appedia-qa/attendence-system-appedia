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
  status: {
    type: String,
    enum: ['approved', 'unapproved'],
    default: 'unapproved'
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'contributor'],
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
        // ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.username
        delete ret.hashedPassword
        delete ret.createdAt
        delete ret.updatedAt
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;