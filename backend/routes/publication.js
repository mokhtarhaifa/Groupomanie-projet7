const express = require('express');
const router = express.Router();
const multer = require('../middelware/multer-config');
const publication = require('../controllers/publication')
const auth = require('../middelware/auth');

router.get('/',auth,publication.getAllPublications);
router.post('/',auth,multer,publication.createPublication);
router.put('/:id',auth,multer,publication.modifyPublication);
router.delete('/:id',auth,multer,publication.deletePublication);
router.put('/likedislike/:id',auth,publication.likeDislikePublication);


module.exports = router;