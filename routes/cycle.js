const express = require('express');
const router = express.Router();
const History = require("../models/history"); // Import the History model
const { restrictToLoggedinUser } = require('../middlewares/auth');
const fs = require('fs');
const path = require('path');
const Cycle = require('../models/cycle');
const { error } = require('console');
const { sendSignalToController } = require("../middlewares/controlSignals")
const overall = require("../models/overallStatus");
const User=require('../models/user');
const { showCycle, addCycle, handleLocationSentByWokwi, lockMyCycle, unlockMyCycle } = require('../controller/cycle');




// this is the home page for cycle
router.get('/', restrictToLoggedinUser,showCycle );
// that's what displays cycles of user on the page it render cycles.ejs in views folder 



//add a new cycle to a user
router.post("/addCycle", restrictToLoggedinUser, addCycle);



router.post('/location',handleLocationSentByWokwi);


router.get('/state', async (req, res) => {
  const a = await overall.findById('672265055d938eaea9d99fd9');
  res.send(a); // Respond with the current cycle state
});




// Lock the cycle
router.post('/lock', restrictToLoggedinUser,lockMyCycle);


// Unlock the cycle
router.post('/unlock', restrictToLoggedinUser, unlockMyCycle);


module.exports = router;
