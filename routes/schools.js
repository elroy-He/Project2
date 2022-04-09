const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schools');

router.get('/new', schoolController.new);
router.post('/new', schoolController.create);
module.exports = router;