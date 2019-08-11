// 成绩表
var mongoose = require('mongoose');
var ScoreSchema = new mongoose.Schema({
	className: String,
	studentName: String,
  courseName: String,
  score: Number,
  time: String,
  teacherName: String,
}, { collection: 'scores'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('scores', ScoreSchema);