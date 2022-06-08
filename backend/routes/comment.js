const express = require('express');
const router = express.Router();

const comment = require('../controllers/comment')
const auth = require('../middelware/auth');


router.post('/',comment.createComments);
router.delete('/:id',auth,comment.deleteComments);

module.exports = router;