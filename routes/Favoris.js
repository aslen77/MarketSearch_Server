const { application } = require("express");
const express = require("express")

const router = express.Router();

const Favoris = require('../models/Favoris')



//api/produits
// SELECT GET
router.get("/", (req, res) => {
    Favoris.find()
        .then((Favoris) => {
            res.send(Favoris);
        })
        .catch((err) => console.log(err));
});

//SELECT GET BY ID 
router.get("/:_idUtilisateur", (req, res) => {
    const idFavorisByUser = req.params._idUtilisateur
    Favoris.find({ _idUtilisateur: idFavorisByUser })
        .then((Favoris) => {
            res.send(Favoris);
        })
        .catch((err) => console.log(err));
});


 // AGGREGATION WITHOUT MATCH ( all mes favoris)
 router.get("/aggreg/favoris", (req, res) => {
    Favoris.aggregate(([{$lookup: {
      from: "images",
      localField: "codejnt",
      foreignField: "codejnt",
      as: "details_jointure",
  }
}]))
  .then((Favoris) => { 
      res.send(Favoris)
  })
  .catch((err) => console.log(err))
  });

  // AGGREGATION WITH MATCH PAR REFERENCE FAVORIS (Details Favoris)
  router.get("/aggreg/favoris/:_id", (req, res) => {
    const _id = req.params._id
    Favoris.aggregate(([{$lookup: {
      from: "images",
      localField: "codejnt",
      foreignField: "codejnt",
      as: "details_jointure",
  }
},  {$match: { $expr : { $eq: [ '$_id' , { $toObjectId: _id}]}}}]))
  .then((Favoris) => { 
      res.send(Favoris)
  })
  .catch((err) => console.log(err))
  });

//Delete

router.delete('/:_id', (req, res) => {
    const idFavoris = req.params._id

    Favoris.findByIdAndRemove(idFavoris)
        .then(result => {
            res.send({
                message: 'Produit supprimé avec succès !',
                data: result
            })
        })
        .catch(err => console.log(err))
})

module.exports = router;