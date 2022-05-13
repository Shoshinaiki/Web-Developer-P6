const Sauce = require("../models/Sauce");
const fs = require("fs");

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
    const thingObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
      ...thingObject,
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
    switch (expr) {
        case "likes":
            {type: 'Number, defaut: 0'}
          break;
        case "dislikes":
            {type: 'Number, defaut: 0'}
          break;
        case "usersLiked":
            {type: [String]}
          break;
        case "usersDisliked":
           {type: [String]}
          break;
      }
};