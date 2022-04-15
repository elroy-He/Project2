const School = require('../models/school');
const User = require('../models/user');
const Instructor = require('../models/instructor')
const Review = require('../models/review');

module.exports = {
  index,
  create,
  show,
  createReview
}

function createReview(req, res) {

    Instructor.findById(req.params.profId, function(err, instructor) {
      console.log(instructor, '<------ pinche instructor')
      const review = new Review();
      review.users = req.user;
      review.instructors = instructor;
      review.ratings = req.body.ratings;
      review.reviews = req.body.reviews;
      console.log(req.user)
      review.userAvatar = req.user.avatar;
      review.userName = req.user.name;
      review.accessibility = req.body.accessibility;
      review.prepareness = req.body.prepareness;
      review.save();
      console.log(review, ' $^&^%&^^& pinche review');
      res.redirect(`/instructors/${instructor._id}`)
    })


}


function show(req, res) {
  Instructor.findById(req.params.profId, function(err, instructor) {
    console.log(instructor , 'loksjdvnkjsdvjsvjk122e23')
    Review.find({instructors: instructor._id}, function(err, reviews) {
      console.log(instructor, '<--- instructor lalala')
      console.log(reviews, '<----- reviews abscanscvascas')
      res.render('Instructors/show', {
        instructor,
        reviews
      });
    })
 })
}

function create(req, res) {
  School.findById(req.params.id, function(err, school) {
    const instructor = new Instructor();
    const review = new Review();
    instructor.name = req.body.name;

    instructor.schoolsTaught = school;
    instructor.usersGone = req.user;
    review.ratings = req.body.ratings;
    review.reviews = req.body.reviews;
    review.users = req.user;
    review.userName = req.user.name;
    review.userAvatar = req.user.avatar;
    review.accessibility = req.body.accessibility;
    review.prepareness = req.body.prepareness;
    instructor.reviews = review;
    instructor.save();
    review.instructors = instructor;

    review.save();
    console.log(review, 'lala <-- review')
    res.redirect(`/schools/${req.params.id}/instructors`);
  })

}

function index(req, res) {
  School.findById(req.params.id, function(err, school) {
    Instructor.find({schoolsTaught: school._id}, function(err, instructors) {
      console.log(school);
      console.log(instructors, '<--- instructors');

      // const reviews = [];
      // instructors.forEach(instructor => {
      //   console.log(instructor, '<--- instructor')
      //   Review.find({instructors: instructor._id}, function(err, review) {
      //     reviews.push(review)
      //     console.log(review, '<--- review')
      //   })
      // })

      // for (let i=0; i<instructors.length; i++) {
      //   Review.find({instructors: instructors[i]._id}, function(err,review) {
      //     reviews.push(review);
      //   })
      // }
      // res.render('instructors/index', {
      //   school,
      //   instructors,
      //   reviews
      // });

      Review.find({}, function(err, reviews) {
        console.log(reviews);
      res.render('instructors/index', {
        school,
        instructors,
        reviews
      });
      })
    })
  })

}