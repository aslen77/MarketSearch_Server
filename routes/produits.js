const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Produit = require('../models/Produit')
const Favoris = require('../models/Favoris')

const Image = require('../models/Image')
const app = express()

const path = require('path')
const fs = require('fs');

const multer = require("multer");

const CodeGenerator = require('node-code-generator')

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    }
  });

const upload = multer({storage : storage}).single("image")

const generator = new CodeGenerator();
var pattern = '*+CD*+92*+81*+66*+382*+';
var howMany = 10000;
// var options = alphanumericChars;
var codes = generator.generateCodes(pattern, howMany);

// console.log('generator = ' , codes[0]);
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
 
  // AGGREGATION WITHOUT MATCH ( all vendeur accueil)
  router.get("/aggreg/produit", (req, res) => {
    Produit.aggregate(([{$lookup: {
      from: "images",
      localField: "codejnt",
      foreignField: "codejnt",
      as: "details_jointure",
  }
}]))
  .then((Produit) => { 
      res.send(Produit)
  })
  .catch((err) => console.log(err))
  });

  // AGGREGATION WITH MATCH PAR REFERENCE PRODUIT (Details Produit)
  router.get("/aggreg/produit/:_id", (req, res) => {
    const _id = req.params._id
    Produit.aggregate(([{$lookup: {
      from: "images",
      localField: "codejnt",
      foreignField: "codejnt",
      as: "details_jointure",
  }
},  {$match: { $expr : { $eq: [ '$_id' , { $toObjectId: _id}]}}}]))
  .then((Produit) => { 
      res.send(Produit)
  })
  .catch((err) => console.log(err))
  });

  // AGGREGATION WITH MATCH BY ID VENDEUR (MES PRODUITS)
  router.get("/aggreg/produit/v/:id_vendeur", (req, res) => {
    const id_vendeur = req.params.id_vendeur
    Produit.aggregate(([{$lookup: {
      from: "images",
      localField: "codejnt",
      foreignField: "codejnt",
      as: "details_jointure",
  }
},  {$match: { id_vendeur : id_vendeur}}]))
  .then((Produit) => { 
      res.send(Produit)
  })
  .catch((err) => console.log(err))
  });

  //POST
  router.post('/', (req,res)=> {
    var codes = generator.generateCodes(pattern, howMany);

    upload(req,res,(err) => {
    
    const produit = new Produit({
      id_vendeur : req.body.id_vendeur,
        titre : req.body.titre,
        categorie : req.body.categorie,
        sous_categorie : req.body.sous_categorie,
        description : req.body.description,
        prix : req.body.prix,
        date_publication : req.body.date_publication,
        nom_vendeur : req.body.nom_vendeur,
        prenom_vendeur : req.body.prenom_vendeur,
        telephone : req.body.telephone,
        critere : req.body.critere,
        codejnt : codes[0],

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
  })

// Ajouter Favoris product in Favoris collection 
router.post('/favoris', (req,res)=> {
  var codes = generator.generateCodes(pattern, howMany);

  upload(req,res,(err) => {
  
  const favoris = new Favoris({
    _idUtilisateur: req.body._idUtilisateur,
    nomUtilisateur: req.body.nomUtilisateur,
    titre: req.body.titre,
    codejnt: req.body.codejnt,
    prix: req.body.prix,

  });

  favoris.save()
  .then(result => {
      res.send({
          message : 'Produit ajouter avec succees dans mes favoris ! ', 
          data :   result
      })
  })
  .catch(err => console.log(err))
})
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