// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const { restrictToLoggedinUser } = require('../middlewares/auth');
const { error } = require('console');
const { showEmergencyContacts, addNewEmergencyContact } = require('../controller/contact');

router.get('/', showEmergencyContacts);

// Store contact route
router.post('/store-contact',addNewEmergencyContact);


module.exports = router;