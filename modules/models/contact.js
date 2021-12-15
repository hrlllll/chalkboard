const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const ContactSchema = new Schema({
    name : {type : String , required: true},
    user: {type : Schema.Types.ObjectId , ref: 'User', required: true},
    phoneNumbers : [
        {
            type : {type: String} ,
            number : {type : String }
        }
    ],
    emailAddress : {type : String },
    mailingAddress : {type : String },
}, { timestamps: true })
ContactSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Contact' , ContactSchema);
