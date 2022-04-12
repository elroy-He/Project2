const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schools');
const isLoggedIn = require('../config/auth');

router.get('/new', schoolController.new);
router.post('/new', isLoggedIn, schoolController.create);
router.get('/index', schoolController.index);
router.delete('/index/:id', schoolController.deleteSchool);
router.get('/:id', schoolController.show);
router.delete('/:id/:i', schoolController.delete);
router.post('/:id', schoolController.newReview);

module.exports = router;