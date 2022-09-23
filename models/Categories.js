const mongoose = require('mongoose')

const CategorieSchema = new mongoose.Schema({
   nom_categorie : {type : String},
   clipart : {type : String, required : true}, 
})

module.exports = mongoose.model('Categories', CategorieSchema); 