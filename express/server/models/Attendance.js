// 学生考勤表
var mongoose = require('mongoose');
var AttendanceSchema = new mongoose.Schema({
	className: String,
  stuNumberAll: Number,
  beNumber: Number,
  notNumber: Number,
  notStu: String,
  remark: String,
  time: String,
  teacherName: String,
}, { collection: 'checks'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('checks', AttendanceSchema);