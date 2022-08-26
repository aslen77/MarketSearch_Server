const { application } = require("express");
const express = require("express")
const {check, validationResult} = require('express-validator')
const router = express.Router(); 

const Utilisateur = require('../models/Utilisateur')

const validate = [
  check('nom')
  .isLength({min : 3 , max : 10})
  .withMessage('le nom doit contenir minimum 3 caractères et 10 caractères ! '),
  check('prenom')
  .isLength({min : 3 , max : 10})
  .withMessage('le prenom doit contenir minimum 3 caractères et 10 caractères ! '),
  check('mdp')
  .isLength({min : 3 , max : 20})
  .withMessage('le mot de passe doit contenir minimum 8 caractères ! '),
  check('email')
  .isEmail().withMessage('email invalide')
  .isLength({min : 5 })
  .withMessage('le mot de passe doit contenir minimum 5 caractères ! '),
  check('tel')
  .isNumeric().withMessage('doit avoir que des chiffres')
  .isLength({min : 8 , max : 8})
  .withMessage('le tel doit contenir 8 chiffres ! '),
  check('cp')
  .isNumeric().withMessage('doit avoir que des chiffres')
  .isLength({min : 5 , max : 5})
  .withMessage('le Code Postale doit contenir 5 chiffres ! '),
  // check('adresse')
  // .isNumeric().withMessage('doit avoir que des chiffres')
  // .isLength({min : 5 , max : 5})
  // .withMessage('le Code Postale doit contenir 5 chiffres ! ')


]
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

router.post('/',validate , (req,res)=> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

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

router.put('/:_id',(req,res) =>{
  const idUser = req.params._id

  Utilisateur.findById(idUser)
    .then(utilisateur => {
       utilisateur.nom = req.body.nom;
        utilisateur.prenom = req.body.prenom;
        utilisateur.email = req.body.email;
        utilisateur.mdp = req.body.mdp;
        utilisateur.tel = req.body.tel;
        utilisateur.adresse = req.body.adresse;
        utilisateur.sexe = req.body.sexe;
        utilisateur.cp = req.body.cp;

        return utilisateur.save();
    })
    .then(result => {
      res.send({
          message : 'Utilisateur modifié avec succès !', 
          data : result
      })
  })
    .catch(err => console.log(err))

})




module.exports = router;