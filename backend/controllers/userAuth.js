const User = require('../models').users;

//package token
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt')

//fonction signup
exports.signup = (req, res) => {
   
    bcrypt.hash(req.body.password, 10)              
      .then(hash => {
        const user = new User({
          lastName:req.body.lastname,
          firstName:req.body.firstname,
          email: req.body.email,
          password: req.body.password                            
        });
        // enregistrer l'user dans la BDD
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  //fonction login
  exports.login = (req, res) => {
    User.findOne({ email: req.body.email })                 //verification d'email
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)        // comparer les mots de passe entrée et enrejistré
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              //creation de token 
              token: jwt.sign(              
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };