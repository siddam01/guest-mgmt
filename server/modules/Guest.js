const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  room: { type: String, required: true },
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date },
  status: { 
    type: String, 
    enum: ['checked-in', 'checked-out', 'pending'],
    default: 'checked-in'
  }
});

module.exports = mongoose.model('Guest', GuestSchema);