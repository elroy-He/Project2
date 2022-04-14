const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  users: {type: Schema.Types.ObjectId, ref: 'User'},
  reviews: {type: String, required: true},
  ratings: {type: Number, required: true},
  accessibility: {type: Number, required: true},
  prepareness: {type: Number, required: true},
  userAvatar: String,
  userName: String,
  instructors: {type: Schema.Types.ObjectId, ref: 'Instructor'}},
  {
	timestamps: true
  });



module.exports = mongoose.model('Review', reviewsSchema);
