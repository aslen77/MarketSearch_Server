const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  id_vendeur :{
    type : String, 
    required:true  
  }, 
  isFavoris : {
    type: Boolean, 
    required : false
  }, 
  codejnt: String
});

module.exports = mongoose.model("Image", ImageSchema);
