const mongoose = require('mongoose')

const SousCategorieSchema = new mongoose.Schema({
   nom_scategorie : {type : String},
   image_path : {type : String},
   _idCategorie : {type : String}
     
    
})

module.exports = mongoose.model('Sous_Categories', SousCategorieSchema); 