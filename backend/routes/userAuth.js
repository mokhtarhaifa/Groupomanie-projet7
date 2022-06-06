const express = require('express');
const router = express.Router();

const userAuth = require('../controllers/userAuth');
const validMail = require('../middelware/validateMail');
const validPwd = require('../middelware/validatePassword');
const connexion = require('../middelware/limitConnexion');

router.post('/signup', validMail,validPwd,userAuth.signup);
router.post('/login', validMail,connexion, userAuth.login);

module.exports = router;