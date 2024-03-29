const { application } = require("express");
const express = require("express")
const moment = require("moment")
const router = express.Router(); 

const Produit = require('../models/Produit')
const Favoris = require('../models/Favoris')

const Image = require('../models/Image')
moment.locale("fr");
const dateNow = moment().format('LL');
const CodeGenerator = require('node-code-generator')



const generator = new CodeGenerator();
var pattern = '*+CD*+92*+81*+66*+382*+';
var howMany = 10000;

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


   // AGGREGATION WITH MATCH BY sous categorie
   router.get("/aggreg/produit/sctg/:sous_categorie", (req, res) => {
    const sous_categorie = req.params.sous_categorie
    Produit.aggregate(([{$lookup: {
      from: "images",
      localField: "codejnt",
      foreignField: "codejnt",
      as: "details_jointure",
  }
},  {$match: { sous_categorie : sous_categorie}}]))
  .then((Produit) => { 
      res.send(Produit)
  })
  .catch((err) => console.log(err))
  });
  

    // AGGREGATION WITH MATCH BY Titre
    router.get("/aggreg/produit/findProduct/:titre", (req, res) => {
      const titre = req.params.titre
      Produit.aggregate(([
        {
          $match: {
            $text: {
                $search: titre
            }
        }
        },
        {$lookup: {
        from: "images",
        localField: "codejnt",
        foreignField: "codejnt",
        as: "details_jointure",
    }
  },  
 

]))
    .then((Produit) => { 
        res.send(Produit)
    })
    .catch((err) => console.log(err))
    });


  //POST
  router.post('/', (req,res)=> {
    var codes = generator.generateCodes(pattern, howMany);
    const produit = new Produit({
      id_vendeur : req.body.id_vendeur,
        titre : req.body.titre,
        categorie : req.body.categorie,
        sous_categorie : req.body.sous_categorie,
        description : req.body.description,
        prix : req.body.prix,
        date_publication : dateNow,
        nom_vendeur : req.body.nom_vendeur,
        prenom_vendeur : req.body.prenom_vendeur,
        tel_contact : req.body.tel_contact,
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

// Ajouter Favoris product in Favoris collection 
router.post('/favoris', (req,res)=> {

  
  const favoris = new Favoris({
    _idUtilisateur: req.body._idUtilisateur,
    nomUtilisateur: req.body.nomUtilisateur,
    prenomUtilisateur: req.body.prenomUtilisateur,
    titre: req.body.titre,
    codejnt: req.body.codejnt,
    prix: req.body.prix,
    categorie : req.body.categorie,
    sous_categorie : req.body.sous_categorie,
    description : req.body.description,
    date_publication : req.body.date_publication,
    tel_contact : req.body.tel_contact,


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
  router.delete('/',(req,res) => { 
    Produit.remove({})
      .then(result => { 
        res.send(result)
      })
      .catch(err => console.log(err))
  })



//GET LAST PRODUCT PUBLISHED CODE JNT 

router.get("/lastOne/:id_vendeur", (req,res) => { 
  const id_vendeur = req.params.id_vendeur;
  Produit.find({id_vendeur : id_vendeur},{codejnt : 1}).sort({_id : -1}).limit(1)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
})

module.exports = router;