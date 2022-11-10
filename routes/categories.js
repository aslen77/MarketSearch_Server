const { application } = require("express");
const express = require("express")

const router = express.Router(); 

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
    Categorie.find()
      .then((Categorie) => {
        res.send(Categorie);
      })
      .catch((err) => console.log(err));
  });
//SELECT GET BY ID 
router.get("/:_id", (req, res) => {
    const idCategorie = req.params._id
    Categorie.findById(idCategorie)
      .then((Categorie) => {
        res.send(Categorie);
      })
      .catch((err) => console.log(err));
  });

  //SELECT GET BY nom_categorie 
router.get("/nom_ctg/:nom_categorie", (req, res) => {
  const nom_categorie = req.params.nom_categorie
  Categorie.find({nom_categorie : nom_categorie})
    .then((Categorie) => {
      res.send(Categorie);
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
    const categorie = new Categorie({
        nom_categorie : req.body.nom_categorie,
        clipart : req.file.filename,

    });

    categorie.save()
    .then(result => {
        res.send({
            message : 'categorie cree avec succees', 
            data :   result
        })
    })
    .catch(err => console.log(err))
  }
})
})

//Delete

router.delete('/:_id',(req,res) => {
    const idCategorie = req.params._id
  
    Categorie.findByIdAndRemove(idCategorie)
    .then(result => {
      res.send({
          message : 'Categorie supprimé avec succès !', 
          data : result
      })
  })
    .catch(err => console.log(err))
  })

  router.delete('/',(req,res) => { 
    Categorie.remove({})
      .then(result => { 
        res.send(result)
      })
      .catch(err => console.log(err))
  })


module.exports = router;