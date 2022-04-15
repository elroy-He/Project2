const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructors');
const isLoggedIn = require('../config/auth');

router.get('/schools/:id/instructors', instructorController.index);
router.post('/schools/:id/instructors', isLoggedIn, instructorController.create);
router.get('/instructors/:profId', instructorController.show);
router.post('/instructors/:profId',isLoggedIn, instructorController.createReview);
// router.put('instructors/:id/edit', isLoggedIn, instructorController.edit);
router.delete('/instructors/:profId/:revId', isLoggedIn, instructorController.delete);
module.exports = router;