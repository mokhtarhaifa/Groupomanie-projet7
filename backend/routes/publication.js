const express = require('express');
const router = express.Router();
const multer = require('../middelware/multer-config');
const publication = require('../controllers/publication')

router.get('/',publication.getAllPublications);
router.post('/',multer,publication.createPublication);
router.put('/:id',multer,publication.modifyPublication);
router.delete('/:id',multer,publication.deletePublication);
router.put('/likedislike/:id',publication.likeDislikePublication);


module.exports = router;