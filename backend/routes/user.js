const express = require('express');
const router = express.Router();

const multer = require('../middelware/multer-config');
const user = require('../controllers/users')
const auth = require('../middelware/auth');

router.get('/:id',multer,user.getProfile);

router.delete('/:id',multer, user.deleteProfile);

router.put('/:id',auth,multer, user.updateProfile);

module.exports = router;