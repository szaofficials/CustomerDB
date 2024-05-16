const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



// Define schema for customer data
const customerSchema = new mongoose.Schema({
  adrNumber: {
    type: String,
    required: true,
    unique: true
  },
  c_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  relation: {
    type: String,
    enum: ['C/O', 'W/O', 'S/O', 'D/O'],
    required: true
  },
  relationshipName: {
    type: String,
    required: true
  },
  banksLinked: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  adrImage: {
    type: String, // Assuming the image will be stored as a URL
  },
  addedBy: {
    type: String,
    required: true
  },

  jcNo: {
    type: String,
    required: true
  },
  addedAt: { type: Date, default: Date.now }
  
  //   addedBy: {
  //     type: mongoose.Schema.Types.ObjectId, // Assuming staff members have unique IDs
  //     ref: 'User', // Reference to another model where staff details are stored
  //     required: true
  //   }
  // ,
});


// Create a model using the schema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
