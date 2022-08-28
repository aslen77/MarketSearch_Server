const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Categorie = require('../models/Categories')



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
    const categorie = new Categorie({
        nom_categorie : req.body.nom_categorie,
        image_path : req.body.image_path,
        sous_categorie : req.body.sous_categorie

      
    });

    categorie.save()
    .then(result => {
        res.send({
            message : 'categorie cree avec succees', 
            data :   result
        })
    })
    .catch(err => console.log(err))
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



module.exports = router;