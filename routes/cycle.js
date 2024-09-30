const express = require('express');
const router = express.Router();
const History = require("../models/history"); // Import the History model
const { restrictToLoggedinUser } = require('../middlewares/auth');
const fs = require('fs');
const path = require('path');
const Cycle =require('../models/cycle');
const { error } = require('console');
const {sendSignalToController}=require("../middlewares/controlSignals")

const DATA_PATH = path.join(__dirname, '..', 'models', 'overallStatus.json');


const readData = () => {
    const rawData = fs.readFileSync(DATA_PATH);
    return JSON.parse(rawData);
  };
  
  // Helper function to write updated data back to the JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};
  
// this is the home page for cycle
// that's what displays cycles of user on the page 
//it render cycles.ejs in views folder 
router.get('/', restrictToLoggedinUser, async (req, res) => {
    try {
        // Fetch all cycles associated with the logged-in user
        const cycles = await Cycle.find({ userId: req.user._id });
        console.log('Cycles fetched:', {cycles:cycles});


        // Render the EJS template with the cycles data
        if(cycles!=null){
            res.render('cycle', { cycles }); // Ensure cycles is passed here

        }
        else{
            res.send("No cycles");
        }
        

    } catch (error) {
        console.error('Error fetching cycles:', error);
        res.status(500).json({ message: 'Error fetching cycles', error });
    }
});



//add a new cycle to a user
router.post("/addCycle",restrictToLoggedinUser,async (req,res)=>{
    try{
        const {name}=req.body;
        if(!req.user || !req.user._id){
            res.status(400).json({message:"User not authenticated or missing ID"});
        }
        const c=await Cycle.findOne({name:name});
        if(c==null){
            const cycle=await Cycle.create({
                name:name,
                userId:req.user._id,
            })
            res.redirect('/api/cycle')
        }
        else{
            throw error;
        }
    }
    catch{
        res.status(400).json({message:"couldn't add cycle!Name might already taken, Try changing the name"})
    }
})




router.post('/location', (req, res) => {
  // Log the incoming request body (the GPS data)
  console.log('Received GPS data:', req.body);

  // Extract latitude and longitude from the request body
  const { latitude, longitude } = req.body;

  
  // Check if the data is valid
  if (latitude && longitude) {
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
    let latitudeInt = parseInt(latitude, 10);   // Converts to base-10 integer
    let longitudeInt = parseInt(longitude, 10);
    if(latitudeInt*latitudeInt+longitudeInt*longitudeInt>25){
        cycleState.buzz=1;
        cycleState.openLock=0;
    }
    else{
        cycleState.buzz=0;
    }

    res.status(200).json({
        message: 'Location data received successfully!',
        receivedData: req.body,
      });
  } else {
    res.status(400).json({ message: 'Invalid GPS data received.' });
  }
  
});

router.get('/state', (req, res) => {
    res.json(readData()); // Respond with the current cycle state
});




// Lock the cycle
router.post('/lock', restrictToLoggedinUser, async (req, res) => {
    // sendsSignaltoController()
    try {
        const { cycleId } = req.body;

        // Find the cycle by its ID and userId
        const cycle = await Cycle.findOne({ _id: cycleId, userId: req.user._id });

        if (!cycle) {
            return res.status(404).json({ message: 'Cycle not found' });
        }
        if (cycle.status === 'locked') {
            return res.status(400).json({ message: 'Cycle is already locked' });
        }

        cycle.status = 'locked';
        await cycle.save();
        const currentData = readData();

        // Update the object with new values if provided
        currentData.openLock = 0;
        // Write the updated object back to the JSON file
        writeData(currentData);

        await History.create({
            userId: req.user._id,
            action: `locked`,
            name:cycle.name
        });

        res.status(200).json({ message: `Cycle "${cycle.name}" locked successfully` });
    } catch (error) {
        console.error('Error locking cycle:', error);
        res.status(500).json({ message: 'Error locking cycle', error });
    }
});


// Unlock the cycle
router.post('/unlock', restrictToLoggedinUser, async (req, res) => {
    // sendUnlockSignaltoController();
    try {
        const { cycleId } = req.body;

        const cycle = await Cycle.findOne({ _id: cycleId, userId: req.user._id });

        if (!cycle) {
            return res.status(404).json({ message: 'Cycle not found' });
        }

        
        if (cycle.status === 'unlocked') {
            return res.status(400).json({ message: 'Cycle is already unlocked' });
        }

        cycle.status = 'unlocked';
        await cycle.save();
        const currentData = readData();

        // Update the object with new values if provided
        currentData.openLock = 1;
        // Write the updated object back to the JSON file
        writeData(currentData);

        await History.create({
            userId: req.user._id,
            name:cycle.name,
            action: `unlocked`,
        });

        res.status(200).json({ message: `Cycle "${cycle.name}" unlocked successfully` });
    } catch (error) {
        console.error('Error unlocking cycle:', error);
        res.status(500).json({ message: 'Error unlocking cycle', error });
    }
});


module.exports = router;
