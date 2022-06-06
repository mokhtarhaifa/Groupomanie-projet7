// Importation du package de validation d'email
const validator = require("validator")

module.exports = (req, res, next) => {
    if(!validator.isEmail(req.body.email)) {
        res.status(401).json({message: "veuillez introduire un mail valide !"})
        
    }
    else {
        next();
    }
  };