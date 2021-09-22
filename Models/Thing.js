const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: {type: String, requiered: true},
    name: { type: String, required: true},
    manufacturer: {type: String, requiered: true},
    description: {type: String, required: true},
    mainPepper: {type: String, requiered: true},
    imageUrl: {type: String, requiered: true},
    heat: {type: Number, requiered: true},
    likes: {type: Number, requiered: ture},
    dislikes: {type: Number, requiered: true},
    usersLiked: {type: ["String<userId>"]},
    usersDisliked: {type: ["String<userId>"]}
});

module.exports = mongoose.model('Thing', thingSchema);