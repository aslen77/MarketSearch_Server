const mongoose = require('mongoose')

const ProduitSchema = new mongoose.Schema({
   id_vendeur : {type : String, required : true},
   titre : {type : String , required : true},
   categorie : String ,
   sous_categorie : String ,
   description : String,
   codejnt : String,
   prix : Number, 
   date_publication : String, 
   nom_vendeur : String,
   prenom_vendeur : String,
   tel_contact : String,
   critere : {
      vetement : {
         typeVet : String, 
         taille : String, 
         marqueMode : String, 
         CouleurMode : String,
         Etat : Number, 
         univer : String, 
         pointure : Number,
         matiere : String, 
         typeSac : String, 
         typeBijoux : String,
         typeChauss : String

      }, 
      vehicule : {
         marqueVehicule : String,
         modele : String, 
         annee_modele : Number,
         carburant : String, 
         boite_vitesse : String, 
         nb_porte : Number, 
         nb_place : Number,
         CouleurVehicule : String, 
         typeVehicule : String,
         date_miseEnCirculation : Date, 
         kilometrage : Number,
         puiss_fiscale : Number

      }
     


   }
   

})

module.exports = mongoose.model('Produit', ProduitSchema); 