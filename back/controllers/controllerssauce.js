const Sauce = require("../models/Sauce");
const fs = require("fs");
const { findOne } = require("../models/Sauce");

exports.getAllSauce = (req, res, next) => {
        Sauce.find()
          .then(sauces => res.status(200).json(sauces))
          .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
        Sauce.findOne({ _id: req.params.id })
          .then(sauce => res.status(200).json(sauce))
          .catch(error => res.status(400).json({ error }));
}; 

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...sauceObject,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      userDisliked: [],
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce crée !" }))
      .catch((error) => res.status(400).json({ error }));
  };
  
  
  
  exports.updateSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const oldUrl = sauce.imageUrl;
        const filename = sauce.imageUrl.split("/images/")[1];
        if (req.file) {
          fs.unlink(`images/${filename}`, () => {
            const sauceObject = {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            };
            Sauce.updateOne(
              { _id: req.params.id },
              { ...sauceObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "Sauce mise à jour!" }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          const newItem = req.body;
          newItem.imageUrl = oldUrl;
          Sauce.updateOne(
            { _id: req.params.id },
            { ...newItem, imageUrl: oldUrl, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce mise à jour!" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(500).json({ error }));
  };
  
  exports.delete = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // pour sécuriser l'API dans une future version finale, vérifier l'identité de l'utilisateur grace à req.token
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "sauce supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  };
  

exports.likeAndDislike = (req, res, next) => {
  const like = parseInt(req.body.like);
  if (like === 1) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        sauce.likes++;
        sauce.usersLiked.push(req.body.userId);
        Sauce.updateOne(
          { _id: req.params.id },
          { likes: sauce.likes, usersLiked: sauce.usersLiked, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Tu like ce produit !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } else if (like === 0) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        for (let i = 0; i < sauce.usersLiked.length; i++) {
          if (sauce.usersLiked[i] === req.body.userId) {
            sauce.usersLiked.splice(i, 1);
            sauce.likes--;
            Sauce.updateOne(
              { _id: req.params.id },
              {
                likes: sauce.likes,
                usersLiked: sauce.usersLiked,
                _id: req.params.id,
              })
              .then(() => res.status(200).json({ message: "Tu ne like plus ce produit !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }}
        for (let j = 0; j < sauce.usersDisliked.length; j++) {
          if (sauce.usersDisliked[j] === req.body.userId) {
            sauce.usersDisliked.splice(j, 1);
            sauce.dislikes--;
            Sauce.updateOne(
              { _id: req.params.id },
              {
                dislikes: sauce.dislikes,
                usersDisliked: sauce.usersDisliked,
                _id: req.params.id,
              })
              .then(() => res.status(200).json({ message: "Tu ne dislike plus ce produit !" }))
              .catch((error) => res.status(400).json({ error }));
          }}})
      .catch((error) => res.status(500).json({ error }));
  } else if (like === -1) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        sauce.dislikes++;
        sauce.usersDisliked.push(req.body.userId);
        Sauce.updateOne(
          { _id: req.params.id },
          {
            dislikes: sauce.dislikes,
            usersDisliked: sauce.usersDisliked,
            _id: req.params.id,
          })
          .then(() => res.status(200).json({ message: "Tu n'aime pas ce produit !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } 
};