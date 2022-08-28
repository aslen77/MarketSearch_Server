const mongoose = require('mongoose')

const CategorieSchema = new mongoose.Schema({
   nom_categorie : {type : String},
   image_path : {type : String},
   sous_categories : [{
       nom_sousCategorie: {type : String , required : true},
       image_path: {type : String},
    //    idCategorie: {Type : String}
   }]
    
})

module.exports = mongoose.model('Categories', CategorieSchema); 