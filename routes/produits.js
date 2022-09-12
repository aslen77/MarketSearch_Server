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

//SELECT GET BY ID 
router.get("/:_id", (req, res) => {
    const idProduit = req.params._id
    Produit.findById(idProduit)
      .then((Produit) => {
        res.send(Produit);
      })
      .catch((err) => console.log(err));
  });

  //POST
  router.post('/', (req,res)=> {
    const produit = new Produit({
        _idUtilisateur : req.body._idUtilisateur,
        titre : req.body.titre,
        categorie : req.body.categorie,
        sous_categorie : req.body.sous_categorie,
        description : req.body.description,
        image : req.body.image,
        prix : req.body.prix,
        date_publication : req.body.date_publication,
        nom_utilisateur : req.body.nom_utilisateur,
        prenom_utilisateur : req.body.prenom_utilisateur,
        tel_contact : req.body.tel_contact,
        critere : req.body.critere
    });

    produit.save()
    .then(result => {
        res.send({
            message : 'Produit cree avec succees', 
            data :   result
        })
    })
    .catch(err => console.log(err))
})




//Delete

router.delete('/:_id',(req,res) => {
    const idProduit = req.params._id
  
    Produit.findByIdAndRemove(idProduit)
    .then(result => {
      res.send({
          message : 'Produit supprimé avec succès !', 
          data : result
      })
  })
    .catch(err => console.log(err))
  })

module.exports = router;