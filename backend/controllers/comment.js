const Comments = require('../models').comments;

// récupération du publication

exports.createComments = (req, res) => {
  
  // creation d'objet publication 
  const newComment ={
    userId : req.body.userId,
    publicationId : req.body.publicationId,
    content: req.body.content
  }
    
  Comments.create(newComment)
    .then(Comment => res.status(201).json( Comment ))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteComments = (req, res) => {
      // creation d'objet publication 
      
      Comments.findOne(
        { where: { id: req.params.id } })
      .then(function (comm) {
        return comm.destroy();
      }).then(function (comm) {
          res.sendStatus(200);
      });
    };

