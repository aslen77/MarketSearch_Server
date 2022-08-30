const mongoose = require('mongoose')

const ProduitSchema = new mongoose.Schema({
   _idUtilisateur : {type : String, required : true},
   titre : {type : String , required : true},
   categorie : String ,
   sous_categorie : String ,
   description : String,
   image_path : {type : String, required : true},
   prix : Number, 
   date_publication : {type : Date , default : Date}, 
   nom_utilisateur : String,
   prenom_utilisateur : String,
   tel_contact : Number
})

module.exports = mongoose.model('Produit', ProduitSchema); 