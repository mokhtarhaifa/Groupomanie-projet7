const Publications = require('../models').publications;
const Users = require('../models').users;
const Comments = require('../models').comments;

// importation du package file system
// const fs = require('fs');

//  création de publication
exports.createPublication = (req, res) => {
  // Publication avec image
  let imgPublication;
  if(req.file){
    imgPublication =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  // creation d'objet publication 
  const newPublication ={
    userId : req.body.userId,
    content: req.body.content,
    imgUrl: imgPublication
  }
    
  Publications.create(newPublication)
    .then(Publication => res.status(201).json( Publication ))
    .catch(error => res.status(400).json({ error }));
};
// récupération du publication
exports.getAllPublications= (req, res) => {
  
    Publications.findAll({
      // On y inclue les utilisateurs, likes et commentaires
      include: [
          { model: Users, attributes: ['id', 'firstName', 'lastName', 'imgUrl'] },
          { model: Comments, include: [
            { model: Users, attributes: ['id', 'firstName', 'lastName', 'imgUrl'] }
          ]}
      ]
  })
    .then(
      (publications) => {
        res.status(200).json(publications);
      })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    )}

// modifier publication
exports.modifyPublication = (req, res) => {
  let imgPublication;
  if(req.file){
    imgPublication =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  // creation d'objet publication 
  const newPublication ={
    userId : req.body.userId,
    content: req.body.content,
    imgUrl: req.body.imgUrl
  }
  Publications.findOne(
    { where: { id: req.params.id } })
  .then(function (pub) {
    return pub.update(newPublication);
  }).then(function (pub) {
      res.sendStatus(200);
  });
};
// suppression publication
exports.deletePublication = (req, res) => {
  // creation d'objet publication 
  
  Publications.findOne(
    { where: { id: req.params.id } })
  .then(function (pub) {
    return pub.destroy();
  }).then(function (pub) {
      res.sendStatus(200);
  });
};
// like et dislike du publication
exports.likeDislikePublication = (req, res) => {
  // creation d'objet publication 
  const newPublication ={
    likes : req.body.likes,
    dislikes: req.body.dislikes
  }
  Publications.findOne(
    { where: { id: req.params.id } })
  .then(function (pub) {
    return pub.update(newPublication);
  }).then(function (pub) {
      res.sendStatus(200);
  });
};