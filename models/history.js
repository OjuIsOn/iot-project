const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    action: {
        type: String,
        enum: ['locked', 'unlocked'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const History = mongoose.model('History', historySchema);
module.exports = History;
