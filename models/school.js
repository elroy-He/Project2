const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  usersGone: [{type: Schema.Types.ObjectId, ref: 'User'}],
  reviews: [{type: String, required: true}],
  ratings: [{type: Number, required: true}],
  schoolName: {type: String, required: true} },
  {
	timestamps: true
  });



module.exports = mongoose.model('School', schoolSchema);
