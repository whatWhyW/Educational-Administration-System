var mongoose = require('mongoose');
var ClassPlanSchema = new mongoose.Schema({
  classRroceed: String,
  date: {
    type: String
  },
  remark: String
}, { collection: 'classPlans'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('classplans', ClassPlanSchema);