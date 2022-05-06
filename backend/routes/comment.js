const express = require('express');
const router = express.Router();
const multer = require('../middelware/multer-config');
const comment = require('../controllers/comment')
router.post('/',multer,comment.createComments);
router.delete('/:id',comment.deleteComments);

module.exports = router;