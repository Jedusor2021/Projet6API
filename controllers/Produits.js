const Produits = require('../Models/Produits');//ok
const fs = require('fs');//ok
const { callbackify } = require('util');

exports.createProduits = (req, res, next) => {
  const produitsObject = JSON.parse(req.body.sauce);
  const nouveauProduit = new Produits({
    ...produitsObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log(nouveauProduit)

  nouveauProduit.save()
    .then(() => res.status(201).json({ messages : 'objet enregistré'}))
    .catch(error => res.status(400).json({error}));
};

exports.modifyProduits = (req, res, next) => {
  const produitsObject = req.file ?
  {
    ...JSON.parse(req.body.Produits),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body };
  Produits.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.userId })
    .then(() => res.status(200).json({ message: 'Objet modifié'}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteProduits = (req, res, next) => {
  Produits.findOne({ _id: req.params.id })
    .then(produits => {
      const filename = produits.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Produits.deleteOne({ _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Objet supprimé'}))
          .catch(error => res.status(400).json({error}));
    });
  })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneProduits = (req, res, next) => {
  Produits.findOne({ _id: req.params.id })
    .then(produit => res.status(200).json(produit))
    .catch(error => res.status(404).json({error}));
};

exports.getAllProduits = (req, res, next) => {
  Produits.find()
    .then(produits => res.status(200).json(produits))
    .catch(error => res.status(400).json({error}));
};

exports.addLike = (req, res, next) => {
  if (req.body.like == 1) {
    // le cas où la personne a cliqué sur like
    Produits.findOne({ _id: req.params.id })
        .then(produit => {
          // ici tu as accès à la variable user
          if (produit.usersLiked.includes(req.body.userId) == false) {
            // modifier le produit
            Produits.updateOne(
              {
                _id: req.params.id
              },
              {
                likes: produit.likes + 1,
                usersLiked: [...produit.usersLiked, req.body.userId],
              }
            )
            .then(() => res.status(200).json({ message: 'Objet modifié'}))
          }
        })
  } else if (req.body.like == -1) {
    // le cas où la personne a cliqué sur like
    Produits.findOne({ _id: req.params.id })
        .then(produit => {
          // ici tu as accès à la variable user
          if (produit.usersDisliked.includes(req.body.userId) == false) {
            // modifier le produit
            Produits.updateOne(
              {
                _id: req.params.id
              },
              {
                dislikes: produit.dislikes + 1,
                usersDisliked: [...produit.usersDisliked, req.body.userId],
              }
            )
            .then(() => res.status(200).json({ message: 'Objet modifié'}))
          }
        })
   } else if (req.body.like == 0) {
      // le cas où la personne a annulé un like ou un dislike
      Produits.findOne({ _id: req.params.id })
          .then(produit => {
            // ici tu as accès à la variable user
            if (produit.usersDisliked.includes(req.body.userId) == true) {
              // modifier le produit
              let pos = produit.usersDisliked.indexOf(req.body.userId);
              produit.usersDisliked.splice(pos, 1);

              Produits.updateOne(
                {
                  _id: req.params.id
                },
                {
                  dislikes: produit.dislikes -1,
                  usersDisliked: produit.usersDisliked,
                }
              )
              .then(() => res.status(200).json({ message: 'Objet modifié'}))
            } else  if (produit.usersLiked.includes(req.body.userId) == true) {
              // modifier le produit
              let pos = produit.usersLiked.indexOf(req.body.userId);
              produit.usersLiked.splice(pos, 1);

              Produits.updateOne(
                {
                  _id: req.params.id
                },
                {
                  likes: produit.likes -1,
                  usersLiked: produit.usersLiked,
                }
              )
              .then(() => res.status(200).json({ message: 'Objet modifié'}))
            }
          })
        }       
  };