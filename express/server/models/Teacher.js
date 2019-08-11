var mongoose = require('mongoose');
var TeacherSchema = new mongoose.Schema({
	teaNum: String,
  teacherName :String,
  sex : String,
  age : Number,
  moblie : Number,
  className: String,
  speciality : String,
}, { collection: 'teachers'});
module.exports = mongoose.model('teachers', TeacherSchema);
