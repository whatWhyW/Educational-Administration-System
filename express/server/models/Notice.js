// 校园公告
var mongoose = require('mongoose');
var NoticeSchema = new mongoose.Schema({
  title: String,
  time: String,
  val: String,
  cata: String
}, { collection: 'notices'});
//这里mongoose.Schema最好要写上第二个参数，

//导出model模块
module.exports = mongoose.model('notices', NoticeSchema);