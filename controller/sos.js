const overall=require('../models/overallStatus')

async function receiveDataFromSos(req, res){
    console.log("POST request received:", req.body);
    try {
        const { flag } = req.body;
        const buzzValue = flag === "1" ? 1 : 0;

        // Update the database with the new buzz value
        await overall.findByIdAndUpdate('672265055d938eaea9d99fd9', { buzz: buzzValue });

        res.status(200).json({ message: 'POST processed successfully', buzz: buzzValue });
    } catch (error) {
        console.error("Error in POST request:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

async function fetchSosDataFromDB(req, res){
    try {
        const document = await overall.findById('672265055d938eaea9d99fd9');
        if (document) {
            res.json({ buzz: document.buzz }); // Return the current buzz value from the database
        } else {
            res.status(404).json({ message: 'Document not found' });
        }
    } catch (error) {
        console.error("Error in GET request:", error.message);
        res.status(500).json({ message: 'Error retrieving data' });
    }
}

module.exports={
    receiveDataFromSos,
    fetchSosDataFromDB
}