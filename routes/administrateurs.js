const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Administrateur = require('../models/Administrateurs')



//api/admin
// SELECT GET
router.get("/", (req, res) => {
    Administrateur.find()
      .then((Produit) => {
        res.send(Produit);
      })
      .catch((err) => console.log(err));
  });








module.exports = router;