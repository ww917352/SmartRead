var mongoose = require('mongoose');


// Document schema for polls
exports.RssSchema = new mongoose.Schema({
    userId:{type:String, required: true},
    name: { type: String, required: true },
    url: { type: String, required: true }
});