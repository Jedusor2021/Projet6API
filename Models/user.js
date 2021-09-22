const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
     email: { type: String, requiered: true, unique: true },
     passeword: { type: String, requiered: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.models('user', userSchema);