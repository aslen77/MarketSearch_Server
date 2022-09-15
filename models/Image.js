const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  refProduit : {type : String , required : true },
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
  }
});

module.exports = mongoose.model("Image", ImageSchema);
