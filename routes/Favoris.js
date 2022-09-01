const { application } = require("express");
const express = require("express")

const router = express.Router();

const Favoris = require('../models/Favoris')



//api/produits
// SELECT GET
router.get("/", (req, res) => {
    Favoris.find()
        .then((Favoris) => {
            res.send(Favoris);
        })
        .catch((err) => console.log(err));
});

//SELECT GET BY ID 
router.get("/:_idUtilisateur", (req, res) => {
    const idFavorisByUser = req.params._idUtilisateur
    Favoris.find({ _idUtilisateur: idFavorisByUser })
        .then((Favoris) => {
            res.send(Favoris);
        })
        .catch((err) => console.log(err));
});

//POST
router.post('/', (req, res) => {
    const favoris = new Favoris({
        _idUtilisateur: req.body._idUtilisateur,
        nomUtilisateur: req.body.nomUtilisateur,
        titre: req.body.titre,
        path_image: req.body.path_image,
        prix: req.body.prix,

    });

    favoris.save()
        .then(result => {
            res.send({
                message: 'Produit cree avec succees',
                data: result
            })
        })
        .catch(err => console.log(err))
})




//Delete

router.delete('/:_id', (req, res) => {
    const idFavoris = req.params._id

    Favoris.findByIdAndRemove(idFavoris)
        .then(result => {
            res.send({
                message: 'Produit supprimé avec succès !',
                data: result
            })
        })
        .catch(err => console.log(err))
})

module.exports = router;