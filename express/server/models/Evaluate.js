// 教学评测内容表
var mongoose = require('mongoose');
var EvaluateSchema = new mongoose.Schema({
	value1:  String,
    value2:  String,
    value3:  String,
    value4:  String,
    value5:  String,
    value6:  String,
    value7:  String,
    value8:  String,
    value9:  String,
    value10: String,
    value11: String,
    value12: String,
}, { collection: 'evaluates'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('evaluates', EvaluateSchema);