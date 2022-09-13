const mongoose = require('mongoose')

const FavorisSchema = new mongoose.Schema({
   _idProduit : {type : String},
   _idUtilisateur : {type : String},
   nomUtilisateur : {type : String},
   titre : {type : String, required : true},
   refImage : {type : String, required : true},
   prix : Number
     
    
})

module.exports = mongoose.model('Favoris', FavorisSchema); 