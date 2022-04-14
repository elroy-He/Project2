const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
	name: String,
	schoolsTaught: {type: Schema.Types.ObjectId, ref: 'School'},
  usersTaught: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
	timestamps: true
  });

module.exports = mongoose.model('Instructor', instructorSchema);