const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true
	},
  //not sure about this one
	schoolsTaught: {type: Schema.Types.ObjectId, ref: 'Campus'},
	avatar: String
  },
  usersTaught: {type: Schema.Types.ObjectId, ref: 'User'},
  reviews: {
    type: String,
    required: true
  },
  ratings: {
    Type: Number,
    required: true
  },
  {
	timestamps: true
  });

module.exports = mongoose.model('Instructor', instructorSchema);