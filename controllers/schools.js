const School = require('../models/school');
const User = require('../models/user');
const Instructor = require('../models/instructor');

module.exports = {
  new: newSchool,
  create,
  index,
  show,
  delete: deleteReview,
  newReview,
  deleteSchool
}


function deleteSchool(req, res) {
  //console.log(schoolsAdded, '<--- original');
  //console.log(req.params.id, '<---')
  School.findByIdAndRemove(req.params.id, function(err, school) {
    school.save(function(err) {
      res.redirect('/schools/index')
    });

  })
}

function newReview(req, res) {

  School.findById(req.params.id, function (err, school) {
    school.reviews.push(req.body.reviews);
    school.ratings.push(parseInt(req.body.ratings));
    school.usersGone.push(req.user);
    school.save();
    res.redirect(`/schools/${req.params.id}`)

  });
}


function deleteReview(req, res) {

  School.findById(req.params.id, function(err, schoolDocument){
		// find the subdocument itself, find the review in the movieDocument, that has the same id as our req.params.id

		// If the review wasn't made by the user redirect them back to the same page
    console.log(schoolDocument, '<--- schoolDocument')
    console.log(req.params.i, schoolDocument.usersGone[req.params.i], req.user._id);
		if(!schoolDocument.usersGone[parseInt(req.params.i)].equals(req.user._id)) return res.redirect(`/schools/${schoolDocument._id}`);

		// remove the review
		// 1 way find the review then call remove method
    schoolDocument.reviews.splice(req.params.i, 1);
    schoolDocument.ratings.splice(req.params.i, 1);
		// remove the review
		// movieDocument.reviews.remove(req.params.id)
		schoolDocument.save(function(err){
			// if(err) next(err); // next(err) passes it to the express generator err handler
			res.redirect(`/schools/${schoolDocument._id}`)
		})
	})
  }





function show(req, res) {
  School.findById(req.params.id, function(err, school) {
    User.find({}, function(err, users) {
      console.log(users)
      res.render('schools/show', {
        school,
        users
    })
    })

  })
}

function index(req,res) {
  console.log(req.user);
  School.find({}, function(err, schools){
    Instructor.find({}, function (err, instructors){
      res.render('schools/index', {
        schools,
        instructors
      })
    })

  })
}
function newSchool(req, res) {
  res.render('schools/new');
}

function create(req, res) {
  console.log(req.body);
  const schoolToBeAdded = new School(req.body)
  School.find({}, function(err, schools) {
    if(schools.some(school => school.schoolName === req.body.schoolName)) {
      res.redirect('/schools/index');
    } else {
      schoolToBeAdded.usersGone.push(req.user);
      schoolToBeAdded.save();
      res.redirect('/schools/index')
    }
  });
}