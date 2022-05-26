const express = require('express');
const router = express.Router();

const userAuth = require('../controllers/userAuth');

router.post('/signup', userAuth.signup);
router.post('/login', userAuth.login);

module.exports = router;