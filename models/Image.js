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
});

module.exports = mongoose.model("Image", ImageSchema);
