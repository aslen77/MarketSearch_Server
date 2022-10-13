const mongoose = require('mongoose')

const FavorisSchema = new mongoose.Schema({
   _idProduit : {type : String},
   _idUtilisateur : {type : String},
   nomUtilisateur : {type : String},
   prenomUtilisateur :{type:String},
   titre : {type : String, required : true},
   codejnt : {type : String, required : true},
   prix : Number,
   categorie : String ,
   sous_categorie : String ,
   description : String,
   tel_contact : String,
   date_publication : String 
    
})

module.exports = mongoose.model('Favoris', FavorisSchema); 