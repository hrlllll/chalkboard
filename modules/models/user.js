const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    email : {type : String , required: true , unique: true},
    password : {type : String , required: true},
    contacts: [{
        type : Schema.Types.ObjectId , ref: 'Contact'
    }]
}, { timestamps: true })


UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password , 10  , (err, hash) => {
      this.password = hash;
      next();
  })
})
module.exports = mongoose.model('User' , UserSchema);
