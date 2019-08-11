// 课程表
var mongoose = require('mongoose');
var CourseScheduleSchema = new mongoose.Schema({
	time: String,
	tea: String,
	exam: String,
	remark: String
}, { collection: 'courseSchedules'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('courseSchedules', CourseScheduleSchema);