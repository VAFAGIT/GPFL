const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
  
  name:{
    type: String,
    required:  [true, 'Please enter your name']
  },
  email:{
    type: String,
    required: [true, 'please enter your email'],
    unique: true
  },
  password:{
    type: String,
    required: [true, 'please enter your password']
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);


