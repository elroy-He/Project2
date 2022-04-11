const School = require('../models/school');

module.exports = {
  new: newSchool,
  create,
  index,
  show,
  delete: deleteReview
}
const schoolsAdded = [];
function deleteReview(req, res, next) {
  School.findById(req.params.id, function(err, schoolDocument){
		// find the subdocument itself, find the review in the movieDocument, that has the same id as our req.params.id

		// If the review wasn't made by the user redirect them back to the same page
		if(!schoolDocument.usersGone.equals(req.user._id)) return res.redirect(`/schools/${schoolDocument._id}`);

		// remove the review
		// 1 way find the review then call remove method
		schoolDocument.remove()
		// remove the review
		// movieDocument.reviews.remove(req.params.id)
		schoolDocument.save(function(err){
			if(err) next(err); // next(err) passes it to the express generator err handler
			res.redirect(`/schools/${schoolDocument._id}`)
		})


	})
}

function show(req, res) {
  School.findById(req.params.id, function(err, school) {
    res.render('schools/show', {
      school
    })
  })
}

function index(req,res) {
  School.find({}, function(err, schools){
    res.render('schools/index', {
      schools
    })
  })
}
function newSchool(req, res) {
  res.render('schools/new');
}

function create(req, res) {
  console.log(req.body);
  const addedSchool = new School(req.body);
  if(schoolsAdded.includes(addedSchool.schoolName)) {
    res.redirect('/schools/index');
  } else {
      schoolsAdded.push(addedSchool.schoolName);
      addedSchool.usersGone = req.user;
      addedSchool.save(function(err) {
      if (err) return res.render('flight/new');
      res.redirect('/schools/index');
    })
  }

}