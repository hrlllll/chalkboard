const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    name : {type : String , required: true},
    phoneNumbers : [
        {
            type : {type: String} ,
            number : {type : String }
        }
    ],
    emailAddress : {type : String , required: true},
    mailingAddress : {type : String , required: true},
}, { timestamps: true })

module.exports = mongoose.model('Contact' , ContactSchema);
