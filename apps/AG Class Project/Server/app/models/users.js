var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    active: { type: Boolean, default: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    dateRegistered: { type: Date, default: Date.now}    
});

module.exports = 
 Mongoose.model('User', UserSchema);

