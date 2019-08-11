// 课程表
var mongoose = require('mongoose');
var ClassScheduleSchema = new mongoose.Schema({
	time: String,
	className: String,
	course: String,
	remark: String,
	teacherName: String
}, { collection: 'classSchedules'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('classSchedules', ClassScheduleSchema);