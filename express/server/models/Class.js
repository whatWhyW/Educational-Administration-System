var mongoose = require('mongoose');
var ClassSchema = new mongoose.Schema({
	classId: String,
  className: String,
  classroom: String,
  stuNumber: String,
  teacherName: String,
  remark: String
}, { collection: 'classes'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('classes', ClassSchema);