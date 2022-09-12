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

const upload = multer({storage : storage}).single("image_path")




router.get("/upload/", (req, res) => {
  Image.find()
  .then((Image) => {
    res.send(Image);
 
})
.catch((err) => console.log(err));
  
});


router.post("/upload/",(req, res) => {
    upload(req,res,(err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new Image({
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
