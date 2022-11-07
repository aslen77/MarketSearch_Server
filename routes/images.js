const { application } = require("express");
const express = require('express')

const Image = require('../models/Image')
const Produit = require('../models/Produit')
const app = express()

const path = require('path')
const router = express.Router();
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
    folder: "MarketSearch_Image",
  },
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


// afficher tous les images par vendeur

router.get("/upload/vendeurPr/:id_vendeur", (req, res) => {
  const id_vendeur = req.params.id_vendeur;
  Image.find({id_vendeur : id_vendeur})
  .then((Image) => {
    res.send(Image);
 
})
.catch((err) => console.log(err));
  
});



// post images
router.post("/upload/",(req, res) => {
    upload(req,res,(err) => {
        if (err) {
            console.log(err)
        }
        else {
          
            const newImage = new Image({
                nom : req.body.nom,
                image : req.file.filename,
                id_vendeur : req.body.id_vendeur,
                isFavoris : req.body.isFavoris,
                codejnt : req.body.codejnt
                
            })
            newImage
                .save()
                .then(() => res.send('Enregistrement avec succées ! '))
                .catch((err) => console.log(err))
        }
    })
  });

  // delete when i delete product by id automatiqully 2 request after
  router.delete('/upload/:codejnt',(req,res) => { 

    const codeJnt = req.params.codejnt;
    
    Image.remove({codejnt : codeJnt})
      .then(result => { 
        res.send(result)
      })
      .catch(err => console.log(err))
  })
  router.delete('/upload',(req,res) => { 
    Image.remove({})
      .then(result => { 
        res.send(result)
      })
      .catch(err => console.log(err))
  })

module.exports = router;
