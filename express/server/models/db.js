var mongoose = require('mongoose');
DB_URL = 'mongodb://localhost: 27017/edu';
// 连接数据库
mongoose.connect(DB_URL, {
    useNewUrlParser: true
});
// 连接成功
mongoose.connection.on('connected', function() {
	console.log('Mongoose connection open to' + DB_URL)
});
// 连接异常
mongoose.connection.on('err', function(err) {
	console.log('Mongoose connect error' + err)
});
// 断开连接
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose connection disconnected')
});
module.exports = mongoose;