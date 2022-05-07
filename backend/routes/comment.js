const express = require('express');
const router = express.Router();
const multer = require('../middelware/multer-config');
const auth = require('../middelware/auth');

const comment = require('../controllers/comment')


router.post('/',auth,multer,comment.createComments);
router.delete('/:id',auth,comment.deleteComments);

module.exports = router;