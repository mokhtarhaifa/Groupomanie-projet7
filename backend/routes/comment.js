const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth');

const comment = require('../controllers/comment')


router.post('/',comment.createComments);
router.delete('/:id',comment.deleteComments);

module.exports = router;