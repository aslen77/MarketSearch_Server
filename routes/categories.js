const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Categorie = require('../models/Categories')

const app = express()

const path = require('path')
const fs = require('fs');

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "cliparts",
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  }
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