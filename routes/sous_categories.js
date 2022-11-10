const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Scategorie = require('../models/SousCategorie')
const Categorie = require('../models/Categories')

const app = express()

const path = require('path')
const fs = require('fs');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const multer = require("multer");

cloudinary.config({
  cloud_name: "drd94tfnw",
  api_key: "317625455142781",
  api_secret: "S1ry3yZPsNJDYO6oqpEawcEV4RU",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MarketSearch_cliparts",
  },
});
const upload = multer({storage : storage}).single("clipart")


//api/categories
// SELECT GET
router.get("/", (req, res) => {
    Scategorie.find()
      .then((Scategorie) => {
        res.send(Scategorie);
      })
      .catch((err) => console.log(err));
  });

// SELECT BY ID CATEGORIE 

router.get("/byCtg/:_idCategorie", (req, res) => {
  const _idCategorie = req.params._idCategorie
  Scategorie.find({_idCategorie: _idCategorie})
    .then((Scategorie) => {
      res.send(Scategorie);
    })
    .catch((err) => console.log(err));
});




//SELECT GET BY ID 
router.get("/:_id", (req, res) => {
    const idScategorie = req.params._id
    Scategorie.findById(idScategorie)
      .then((Scategorie) => {
        res.send(Scategorie);
      })
      .catch((err) => console.log(err));
  });


  //POST
  router.post('/', (req,res)=> {
    upload(req,res,(err) => {
      if (err) {
          console.log(err)
      }
      else {
    const scategorie = new Scategorie({
        nom_scategorie : req.body.nom_scategorie,
        clipart : req.file.filename,
        _idCategorie : req.body._idCategorie,
    });

    scategorie.save()
    .then(result => {
        res.send({
            message : 'sous categorie cree avec succees', 
            data :   result
        })
    })
    .catch(err => console.log(err))
  }
})
})

//Delete

router.delete('/:_id',(req,res) => {
    const idScategorie = req.params._id
  
    Scategorie.findByIdAndRemove(idScategorie)
    .then(result => {
      res.send({
          message : 'sous categorie supprimé avec succès !', 
          data : result
      })
  })
    .catch(err => console.log(err))
  })

  router.delete('/',(req,res) => { 
    Scategorie.remove({})
      .then(result => { 
        res.send(result)
      })
      .catch(err => console.log(err))
  })

module.exports = router;