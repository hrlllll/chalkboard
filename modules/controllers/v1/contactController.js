const Controller = require('./../controller')
const ContactTransform = require(`${config.path.transform}/ContactTransform`);

module.exports = new class ContactController extends Controller{

    index(req , res) {
        this.model.Contact.find({} , ( err , contacts) => {
            if (err) throw err;
            if (contacts) {
                return res.json({
                    data : new ContactTransform().transformCollection(contacts),
                    success : true

                })
            }
            return res.json({
                message : 'Contact empty',
                success : false
            })

        })

    }


    store(req , res) {
        let newContact = new this.model.Contact({
            name : req.body.name ,
            phoneNumbers : req.body.phoneNumbers ,
            emailAddress : req.body.emailAddress ,
            mailingAddress : req.body.mailingAddress ,
        }).save(error => {
            if (error) throw error;
            res.json({
                data : newContact ,
                success : true
            })
        })
    }

    update(req , res) {
        // req.checkParams('id' , 'id is not valid').isMongoId()

        this.model.Contact.findOneAndUpdate(req.params.id , { name : 'mahdi'}, (err, contact) => {
            res.json('update success')
        })
    }

    remove(req , res) {
        // req.checkParams('id' , 'id is not valid').isMongoId()

        this.model.Contact.findOneAndRemove(req.params.id , (err, contact) => {
            res.json('delete success')
        })
    }
}
