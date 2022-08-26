const mongoose = require('mongoose')

const ProduitSchema = new mongoose.Schema({
   // a modifier
   refProduit : {type : String},
   nomProduit : {type : String}
    
})

module.exports = mongoose.model('Produit', ProduitSchema); 