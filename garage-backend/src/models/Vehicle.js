const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  make: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  vin: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    minlength: 17,
    maxlength: 17
  },
  licensePlate: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    maxlength: 10
  },
  color: {
    type: String,
    trim: true,
    maxlength: 30
  },
  engineType: {
    type: String,
    trim: true,
    maxlength: 50
  },
  transmission: {
    type: String,
    enum: ['manual', 'automatic'],
    default: 'automatic'
  },
  fuelType: {
    type: String,
    enum: ['gasoline', 'diesel', 'electric', 'hybrid'],
    default: 'gasoline'
  },
  mileage: {
    type: Number,
    default: 0
  },
  lastServiceDate: {
    type: Date
  },
  nextServiceDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);