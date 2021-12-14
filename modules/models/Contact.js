const mongoose = require('mongoose');
const {PhoneType} = require("../type/user");
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    name : {type : String , required: true},
    phoneNumber : [
        {
            type : {
                type: PhoneType,
                enum: Object.values(PhoneType)
            } ,
            number : {type : String }
        }
    ],
    emailAddress : {type : String , required: true},
    mailingAddress : {type : String , required: true},
}, { timestamps: true })

module.exports = mongoose.model('Contact' , ContactSchema);
