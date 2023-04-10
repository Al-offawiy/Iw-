const mongoose = require('mongoose');
const { Schema } = mongoose;

const iweSchema = new Schema({
 

   title:{
type : String,
required:true,
   },
    
  content:{
    type: String,
    required: true,
   },

  createdAt:{
    type: Date,
    default:Date.now,
    required: true,
   },
   
 
});


const iwe = mongoose.model('iwe', iweSchema)
module.exports = iwe;