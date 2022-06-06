const express = require('express');
const router = express.Router();

const multer = require('../middelware/multer-config');
const user = require('../controllers/users')
const auth = require('../middelware/auth');

router.get('/:id',auth,multer,user.getProfile);

router.delete('/:id',auth,multer, user.deleteProfile);

router.put('/:id',auth,multer, user.updateProfile);

module.exports = router;