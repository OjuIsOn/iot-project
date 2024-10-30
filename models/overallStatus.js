const mongoose = require('mongoose');

const overallStatusSchema=new mongoose.Schema({
    openLock:{
         type:Number,
      },
      buzz:{
        type:Number
      }
})


const overall = mongoose.model('Overall', overallStatusSchema);
module.exports = overall;