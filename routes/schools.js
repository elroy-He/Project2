const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schools');
const isLoggedIn = require('../config/auth');

router.get('/new', schoolController.new);
router.post('/new', isLoggedIn, schoolController.create);
router.get('/index', schoolController.index);
router.get('/:id', schoolController.show);
router.delete('/:id', schoolController.delete);
module.exports = router;