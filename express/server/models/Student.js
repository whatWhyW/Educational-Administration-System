var mongoose = require('mongoose');
var StudentSchema = new mongoose.Schema({
	stuNum: String,
	// address : String,
  name :String,
  sex : String,
  age : Number,
  moblie : Number,
  className: String,
}, { collection: 'students'});
//这里mongoose.Schema最好要写上第二个参数，明确指定到数据库中的哪个表取数据，目的就是为了以后操作数据要去表中。
// 这里不写第二个参数的话，后面你会遇到坑。

//导出model模块
module.exports = mongoose.model('students', StudentSchema);
