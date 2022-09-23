const mongoose = require('mongoose')

const CategorieSchema = new mongoose.Schema({
   nom_categorie : {type : String},
   clipart : String
})

module.exports = mongoose.model('Categories', CategorieSchema); 