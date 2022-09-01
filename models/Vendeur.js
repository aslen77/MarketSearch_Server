const mongoose = require('mongoose')

const VendeurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    mdp: { type: String, required: true },
    tel: { type: Number, required: true },
    sexe: { type: String, required: true },
    adresse: String,
    cp: Number,
    totalPost: Number

})

module.exports = mongoose.model('Vendeur', VendeurSchema);