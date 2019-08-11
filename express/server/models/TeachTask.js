
var mongoose = require('mongoose');
var moment = require('moment');
var TeacherTaskSchema = new mongoose.Schema({
	courseName: String,
// stage: String,
  teacherName: String,
  proceed: String,
  remark: String,
  date:{
        type: String
        // default: () => moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        // get: v => moment(v).format('YYYY-MM-DD HH:mm')
  }, 
}, { collection: 'teacherTasks'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('teacherTasks', TeacherTaskSchema);
