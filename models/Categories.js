const mongoose = require('mongoose')

const CategorieSchema = new mongoose.Schema({
   nom_categorie : {type : String},
   image_path : {type : String},
     
    
})

module.exports = mongoose.model('Categories', CategorieSchema); 