// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contact: {
    type: String,
    required: true,
    unique: true
  }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
