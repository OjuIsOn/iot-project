const mongoose = require('mongoose');
const { type } = require('os');

const cycleSchema = new mongoose.Schema({
    name: {type:String,required:true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, enum: ['locked', 'unlocked'], default: 'unlocked' },
});

const Cycle = mongoose.model('Cycle', cycleSchema);

module.exports = Cycle;
