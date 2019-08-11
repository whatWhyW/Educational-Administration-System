// 教学评测计划表
var mongoose = require('mongoose');
var EvaluatePlanSchema = new mongoose.Schema({
	proceed: String,
	className: String,
	time: String
}, { collection: 'evaluatePlans'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('evaluatePlans', EvaluatePlanSchema);