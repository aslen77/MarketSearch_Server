const mongoose = require('mongoose')

const SousCategorieSchema = new mongoose.Schema({
   nom_scategorie : {type : String},
   clipart : {type : String, required : true}, 
   _idCategorie : {type : String}
     
    
})

module.exports = mongoose.model('Sous_Categories', SousCategorieSchema); 