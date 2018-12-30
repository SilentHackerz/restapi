const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mySchema = new Schema({
    name : {
        type:String
    },
    email : {
        type : String
    }
});

module.exports = mongoose.model('User',mySchema, 'newusers');