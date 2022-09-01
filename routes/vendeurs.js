const { application } = require("express");
const express = require("express")
const router = express.Router();

const Vendeur = require('../models/Vendeur')

//api/vendeurs
// SELECT GET ALL vendeurs
router.get("/", (req, res) => {
    Vendeur.find()
        .then((Vendeur) => {
            res.send(Vendeur);
        })
        .catch((err) => console.log(err));
});


//SELECT GET BY ID 
router.get("/:_id", (req, res) => {
    const idVendeur = req.params._id
    Vendeur.findById(idVendeur)
        .then((Vendeur) => {
            res.send(Vendeur);
        })
        .catch((err) => console.log(err));
});
// api/vendeurs
//POST

router.post('/', (req, res) => {

    const vendeur = new Vendeur({

        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mdp: req.body.mdp,
        tel: req.body.tel,
        adresse: req.body.adresse,
        sexe: req.body.sexe,
        cp: req.body.cp,
        totalPost: req.body.totalPost

    });

    vendeur.save()
        .then(result => {
            res.send({
                message: 'Utilisateur crée avec succès !',
                data: result
            })
        })
        .catch(err => console.log(err))
})





module.exports = router;