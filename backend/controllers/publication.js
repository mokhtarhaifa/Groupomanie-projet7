const Publications = require('../models').publications;
const Users = require('../models').users;
const Comments = require('../models').comments;

// importation du package file system
// const fs = require('fs');

//  création de publication
exports.createPublication = (req, res) => {
  // Publication avec image
Publications.create({
  content: req.body.content,
  imgUrl: req.file? 
  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: '',
    userId: req.body.userId,
})
  .then((response) =>
  
  res.status(201).send({
     data: response.dataValues
  })
   )
  .catch((error) => res.status(400).json(error.message));
};





// récupération du publication
exports.getAllPublications= (req, res) => {
  
    Publications.findAll({
      // On y inclue les utilisateurs, likes et commentaires
      include: [
          { model: Users, attributes: ['id', 'firstName', 'lastName', 'imgUrl','adminRole'] },
          { model: Comments, include: [
            { model: Users, attributes: ['id', 'firstName', 'lastName', 'imgUrl' ,'adminRole'] }
          ]}
      ],
      order: [["id", "DESC"]],
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
  // creation d'objet publication 
  const newPublication ={
    userId : req.body.userId,
    content: req.body.content,
    imgUrl: req.file? 
  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imgPath,
  }
  Publications.findOne(
    { where: { id: req.params.id } })
  .then(function (pub) {
    if(req.auth.userId == pub.userId){
      console.log("vous n'avez pas le droit de modifier cette publication");
      return pub
  }
  else{
    return pub.update(newPublication);
  }
    
  }).then(function (pub) {
      res.sendStatus(200);
  }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
// suppression publication
exports.deletePublication = (req, res) => {
  // creation d'objet publication 
  
  Publications.findOne(
    { where: { id: req.params.id } })
    .then(function (pub) {
      if(req.auth.userId !== pub.userId){
        console.log("vous n'avez pas le droit de supprimer cette publication");
        return pub
    }
    else{
      return pub.destroy();
    }
  })
  .then(function (pub) {
    return pub.destroy();
  }).then(function (pub) {
      res.sendStatus(200);
  });
};
  exports.getOnePublications = (req, res) => {
    
    Publications.findOne(
      { where: { id: req.params.id } })
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
    )
};
