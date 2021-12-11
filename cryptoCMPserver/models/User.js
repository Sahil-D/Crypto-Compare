const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // following: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
