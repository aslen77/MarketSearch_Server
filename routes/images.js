const { application } = require("express");
const express = require('express')

const Image = require('../models/Image')
const app = express()

const path = require('path')
const router = express.Router();
const fs = require('fs');

const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null,file.originalname);
    }
  });

const upload = multer({storage : storage}).single("image")



// afficher tous les images pour l'accueil
router.get("/upload/", (req, res) => {
  Image.find()
  .then((Image) => {
    res.send(Image);
 
})
.catch((err) => console.log(err));
  
});


//afficher tous les images par utilisateur

//afficher une image par references produit 

Image.ensureIndexes(function(err) {
  if (err)
      console.log('impossible de saisir deux fois la meme image dans le meme produit');
  else
      console.log('create image index successfully');
});
router.post("/upload/",(req, res) => {
    upload(req,res,(err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new Image({
              refProduit : req.body.refProduit,
                nom : req.body.nom,
                image : req.file.filename,
                
            })
            newImage
                .save()
                .then(() => res.send('Enregistrement avec succées ! '))
                .catch((err) => console.log(err))
        }
    })
  });


module.exports = router;
