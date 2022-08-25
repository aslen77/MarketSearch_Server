const { application } = require("express");
const express = require("express")

const router = express.Router(); 

const Utilisateur = require('../models/Utilisateur')


//api/utilisateurs
// SELECT GET ALL Users
router.get("/", (req, res) => {
    Utilisateur.find()
      .then((Utilisateur) => {
        res.send(Utilisateur);
      })
      .catch((err) => console.log(err));
  });
  

//SELECT GET BY ID 
router.get("/:_id", (req, res) => {
    const idUser = req.params._id
    Utilisateur.findById( idUser)
      .then((Utilisateur) => {
        res.send(Utilisateur);
      })
      .catch((err) => console.log(err));
  });
// api/utilisateurs
//POST

router.post('/', (req,res)=> {
    const utilisateur = new Utilisateur({
        nom : req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email,
        mdp : req.body.mdp,
        tel : req.body.tel,
        adresse : req.body.adresse,
        sexe : req.body.sexe,
        cp : req.body.cp,
       
    });

    utilisateur.save()
    .then(result => {
        res.send({
            message : 'Utilisateur crée avec succès !', 
            data : result
        })
    })
    .catch(err => console.log(err))
})



module.exports = router;