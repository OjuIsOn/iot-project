const Contact = require('../models/contact');
const { restrictToLoggedinUser } = require('../middlewares/auth');
const { error } = require('console');

async function showEmergencyContacts(req, res){
    try {
      // Fetch all saved contacts from the database
      const contacts = await Contact.find();
  
      // Pass the contacts to the EJS template
      res.render('contact', { contacts }); // 'contacts' will be available in the EJS file
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching contacts.' });
    }
}

async function addNewEmergencyContact(req, res){
    const { contact } = req.body; // Get contact from request body
    
    try {
      // Check if the contact already exists
      const existingContact = await Contact.findOne({ contact });
      if (existingContact) {
        return res.status(400).json({ message: 'Contact already exists!' });
      }
  
      // If contact doesn't exist, insert the new one
      const newContact = new Contact({ contact });
      await newContact.save();
      
      // res.status(201).json({ message: 'Contact saved successfully!' });
      res.redirect("/api/contact");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  }

module.exports={
    showEmergencyContacts,
    addNewEmergencyContact,
}