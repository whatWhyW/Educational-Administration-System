// 课程表
var mongoose = require('mongoose');
var CourseSchema = new mongoose.Schema({
	courseId: String,
	courseName: String,
  courseTime: Number,
  courseGrade: String,
}, { collection: 'courses'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('courses', CourseSchema);