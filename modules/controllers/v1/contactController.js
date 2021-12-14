const Controller = require('./../controller')
module.exports = new class ContactController extends Controller{

    index(req , res) {
        this.model.Contact.find({} , ( err , contact) => {
            if (err) throw err;
            if (contact) {
                return res.json(contact)
            }
        })

    }


    store(req , res) {
        let newContact = new this.model.Contact({
            name : req.body.name ,
            phoneNumber : req.body.phoneNumber ,
            emailAddress : req.body.emailAddress ,
            mailingAddress : req.body.mailingAddress ,
        }).save(error => {
            if (error) throw error;
            res.json('crete contact')
        })
    }

    update(req , res) {
        this.model.Contact.findOneAndUpdate(req.params.id , { name : 'mahdi'}, (err, contact) => {
            res.json('update success')
        })
    }

    remove(req , res) {
        this.model.Contact.findOneAndRemove(req.params.id , (err, contact) => {
            res.json('delete success')
        })
    }
}
