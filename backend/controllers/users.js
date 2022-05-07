
const User = require('../models').users;


// suppression publication
exports.getProfile = (req, res) => {
  // creation d'objet publication 
  
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

exports.deleteProfile = (req, res) => {
    
    User.findOne(
      { where: { id: req.params.id } })
    .then(function (user) {
      return user.destroy();
    }).then(function (user) {
        res.sendStatus(200);
    });
  };
