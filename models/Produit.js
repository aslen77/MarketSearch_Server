const mongoose = require('mongoose')

const ProduitSchema = new mongoose.Schema({
   refProduit : {type : String},
   nomProduit : {type : String}
    
})

module.exports = mongoose.model('Produit', ProduitSchema); 