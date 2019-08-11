var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	username: String,
    category: String,
    password: String
});
module.exports = mongoose.model('User', UserSchema);