
const User = require('../models').users;


//profil utulisateur
exports.getProfile = (req, res) => {
  User.findOne(
    { where: { id: req.params.id } })
    .then(
        (user) => {
          res.status(200).json(user);
        })
      .catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
};

//modifier profil
exports.updateProfile = (req, res) => {
  const newinfo ={
    firstName :req.body.firstName,
    lastName :req.body.lastName,
    email:req.body.email,
    imgUrl: req.file? 
  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.imgPath,
  }
  User.findOne(
    { where: { id: req.params.id } })
    .then(function (user) {
      if(req.auth.userId !== user.userId){
        console.log("vous n'avez pas le droit de modifier ce profil");
    }
    else{
      return user.update(newinfo);
    }})
  .then(function (pub) {
      res.sendStatus(200);
  })
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  )
};


//supprimer profil
exports.deleteProfile = (req, res) => {
    
    User.findOne(
      { where: { id: req.params.id } })
      .then(function (user) {
        if(req.auth.userId !== user.userId){
          console.log("vous n'avez pas le droit de supprimer ce profil");
      }
      else{
        return user.destroy();
      }})
    .then(function (user) {
        res.sendStatus(200);
    });
  };
