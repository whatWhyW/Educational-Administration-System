// 考试安排
var mongoose = require('mongoose');
var ExamPlanSchema = new mongoose.Schema({
  courseName: String,
  className: String,
  score: String,
  catagory: String,
  time: String,
  teacherName: String,
}, { collection: 'examPlans'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('examPlans', ExamPlanSchema);