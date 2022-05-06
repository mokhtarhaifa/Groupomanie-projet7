const express = require('express');
const router = express.Router();
const multer = require('../middelware/multer-config');
const user = require('../controllers/users')

router.get('/:id',multer,user.getProfile);
router.delete('/:id',multer, user.deleteProfile);

module.exports = router;