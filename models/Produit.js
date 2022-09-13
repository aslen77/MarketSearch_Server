const mongoose = require('mongoose')

const ProduitSchema = new mongoose.Schema({
   _idUtilisateur : {type : String, required : true},
   titre : {type : String , required : true},
   categorie : String ,
   sous_categorie : String ,
   description : String,
   imageRef : String,
   prix : Number, 
   date_publication : {type : Date , default : Date}, 
   nom_utilisateurr : String,
   prenom_utilisateur : String,
   tel_contact : Number,
   critere : {
      vetement : {
         typeVet : String, 
         taille : String, 
         marque : String, 
         Couleur : String,
         Etat : Number, 
         univer : String, 
         pointure : Number,
         matiere : String, 
      }, 
      vehicule : {
         marque : String,
         modele : String, 
         annee_modele : Number,
         carburant : String, 
         boite_vitesse : String, 
         nb_porte : Number, 
         nb_place : Number,
         Couleur : String, 
         typeVehicule : String,
         date_miseEnCirculation : Date, 
         kilometrage : Number,
         puiss_fiscale : Number

      }
     


   }
   

})

module.exports = mongoose.model('Produit', ProduitSchema); 