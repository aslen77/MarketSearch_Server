const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Produit = require('../models/Produit')



//api/produits
// SELECT GET
router.get("/", (req, res) => {
    Produit.find()
      .then((Produit) => {
        res.send(Produit);
      })
      .catch((err) => console.log(err));
  });



  //POST
  router.post('/', (req,res)=> {
    const produit = new Produit({
        refProduit : req.body.refProduit,
        nomProduit : req.body.nomProduit
      
    });

    produit.save()
    .then(result => {
        res.send({
            message : 'produit cree avec succees', 
            data :   result
        })
    })
    .catch(err => console.log(err))
})





module.exports = router;