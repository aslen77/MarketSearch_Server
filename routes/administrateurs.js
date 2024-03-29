const { application } = require("express");
const express = require("express")
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router(); 
const Utilisateur = require('../models/Utilisateur');
const Administrateur = require('../models/Administrateurs')
const verifyToken = require('./verifyToken')
const generateToken = (userSession) => {
  return jwt.sign({_id : userSession._id, email : userSession.email, mdp : userSession.mdp},'SUPERSECRET123');
}

const validate = [
  check('nom')
  .isLength({min : 3 , max : 10})
  .withMessage('le nom doit contenir minimum 3 à 10 caractères ! '),
  check('prenom')
  .isLength({min : 3 , max : 10})
  .withMessage('le prenom doit contenir minimum 3 à 10 caractères ! '),
  // check('mdp')
  // .isLength({min : 3 , max : 20})
  // .withMessage('le mot de passe doit contenir entre 3 et 20 caractères ! '),
  check('email')
  .isEmail().withMessage('email invalide')
  .isLength({min : 5 })
  .withMessage('le mot de passe doit contenir minimum 5 caractères ! '),
  check('tel')
  .isNumeric().withMessage('doit avoir que des chiffres')
  .isLength({min : 8 , max : 8})
  .withMessage('le tel doit contenir 8 chiffres ! '),
  // check('cp')
  // .isNumeric().withMessage('doit avoir que des chiffres')
  // .isLength({min : 5 , max : 5})
  // .withMessage('le Code Postale doit contenir 5 chiffres ! '),
  // check('adresse')
  // .withMessage('ladresse postale doit contenir minimum 5 chiffres ! ')


]

const loginValidation = [
  
  check('mdp')
  .isLength({min : 3 , max : 20})
  .withMessage('le mot de passe doit contenir minimum 8 caractères ! '),
  check('email')
  .isEmail().withMessage('email invalide')
  .isLength({min : 5 })
  .withMessage('le mot de passe doit contenir minimum 5 caractères ! '),
  
]


// GET USER TOKEN PROFILE
router.get("/profile",verifyToken,(req,res) => {
  res.send({success : true , data : req.user , message : "Profil connecte en cours ... "});
})

//api/admin
// SELECT GET
router.get("/", (req, res) => {
    Administrateur.find()
      .then((Produit) => {
        res.send(Produit);
      })
      .catch((err) => console.log(err));
  });


  

// api/admin
//POST


router.post('/' , async (req,res)=> {
  
  const userExist = await Administrateur.findOne({email : req.body.email.toLowerCase()})

  if (userExist) 
  {
    return res.status(400).send({success : false , message : 'Email existe déjà ! ' })
  };

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.mdp, salt)

    const administrateur = new Administrateur({

       
        email : req.body.email.toLowerCase(),
        mdp : hashPassword,
        
       
    });

    administrateur.save()
    .then(result => {
        res.send({
            message : 'Administrateur crée avec succès !', 
            success : true,
            data : result
        })
    })
    .catch(err => console.log({success : false , error}))
})


// login Administrateur 

router.post('/login',loginValidation, async(req,res)=> {

  // validation input
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // verification de l'existance du email 
  const userSession = await Administrateur.findOne({email : req.body.email.toLowerCase()})

  if (!userSession){return res.status(400).send({success : false , message : 'Administrateur n\'est pas inscrit ! '})};

  // verification du mot de passe correcte 

  const validPassword = await bcrypt.compare(req.body.mdp , userSession.mdp)

  if (!validPassword) {
    return res.status(400).send({success : false , message : 'Email ou mot de passe incorrecte ! '});
  }

  // creation et affectation du token 
  const token = generateToken(userSession);
  res.header('auth-token',token).send({ success: true, message : 'connexion réussite ... ',token})

})





module.exports = router;