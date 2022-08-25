const mongoose = require('mongoose')

const UtilisateurSchema = new mongoose.Schema({
    nom : {type : String, required : true}, 
    prenom : {type : String, required : true}, 
    email : {type : String, required : true}, 
    mdp : {type : String, required : true}, 
    tel : {type : String, required : true}, 
    sexe : {type : String, required : true}, 
    adresse : String, 
    cp : String, 

})

module.exports = mongoose.model('Utilisateur', UtilisateurSchema); 