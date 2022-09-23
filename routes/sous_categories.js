const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Scategorie = require('../models/SousCategorie')

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
    Scategorie.find()
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