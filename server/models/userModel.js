const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  c_id: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});



// json web token

userSchema.methods.generateToken = async function () {
  try {

    return jwt.sign(

      {
        userID: this.c_id,
        isAdmin: this.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h"
      }

    );

  } catch (error) {
    console.error(error);

  }
}

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;