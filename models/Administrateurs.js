const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
   email : {type : String},
   mdp : {type : String}
    
})

module.exports = mongoose.model('Administrateurs', AdminSchema); 