const School = require('../models/school');

module.exports = {
  new: newSchool,
  create
}

function newSchool(req, res) {
  res.render('schools/new');
}

function create(req, res) {
  console.log(req.body);
  School.create(req.body);
  res.redirect('/');
}