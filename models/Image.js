const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  image: {
    // data: Buffer,
    type: String,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
