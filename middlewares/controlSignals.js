const axios = require('axios');

// This URL should be updated with your ESP32 ngrok URL
const ESP32_URL = " https://fa6e-122-15-204-67.ngrok-free.app/"; // Replace with actual ngrok URL

async function sendSignalToController(signalType) {
    try {
        let response;

        // Determine the endpoint based on signal type
        if (signalType === 'lock') {
            response = await axios.post(`${ESP32_URL}api/user/lock`, { action: 'lock' }); // Updated endpoint and payload
        } else if (signalType === 'unlock') {
            response = await axios.post(`${ESP32_URL}api/user/lock`, { action: 'unlock' }); // Updated endpoint and payload
        } else {
            throw new Error("Invalid signal type. Must be 'lock' or 'unlock'.");
        }

        // Log the response from the ESP32 (optional)
        console.log(`ESP32 Response: ${response.data}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to send signal to ESP32: ${error.message}`);
        throw error;
    }
}

module.exports = { sendSignalToController };
