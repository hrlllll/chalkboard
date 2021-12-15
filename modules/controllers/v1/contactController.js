const Controller = require('./../controller')
const ContactTransform = require(`${config.path.transform}/ContactTransform`);

module.exports = new class ContactController extends Controller{

    index(req , res) {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        let sort = {}
        if (req.query.createdAt) {
            sort.createdAt = parseInt(req.query.createdAt)
        }
        if (req.query.name) {
            sort.name = parseInt(req.query.name)
        }
        this.model.Contact.paginate({user : req.user._id} , {page , limit , sort}).then((contacts) => {
            if (contacts) {
                        return res.json({
                            data : new ContactTransform().withPagination().transformCollection(contacts),
                            success : true
                        })
                    }
                    return res.json({
                        message : 'Contact empty',
                        success : false
                    })
        }).catch((e) => {
            console.log(e)
        })
    }

    store(req , res) {
        req.checkBody('emailAddress' , 'emailAddress is not valid').isEmail()
        req.checkBody('mailingAddress' , 'mailingAddress is not valid').isEmail()
        this.showValidationErrors(req, res).then((valid) => {
            if (valid) {
                let newContact = new this.model.Contact({
                    name : req.body.name ,
                    user: req.user._id,
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
        }).catch((err) => {
            res.json({
                success : false,
                data : err
            })
        })

    }

    update(req , res) {
        const {name , phoneNumbers , emailAddress , mailingAddress} = req.body
        let query = {}
        if (name) query.name = name
        if (phoneNumbers) query.phoneNumbers = phoneNumbers
        if (emailAddress) {
            req.checkBody('emailAddress' , 'emailAddress is not valid').isEmail()
            query.emailAddress = emailAddress
        }
        if (mailingAddress) {
            req.checkBody('mailingAddress' , 'mailingAddress is not valid').isEmail()
            query.mailingAddress = mailingAddress
        }
        req.checkParams('id' , 'id is not valid').isMongoId()
        this.showValidationErrors(req, res).then((valid) => {
            if (valid) {
                this.model.Contact.findOneAndUpdate({_id: req.params.id , user: req.user._id}  , query, {new : true} , (err, contact) => {
                    if (err) throw err;
                    if (contact) {
                        return res.json({
                            success : true,
                            data : contact,

                        })
                    }
                    return res.json({
                        message : 'Contact Not Found',
                        success : false
                    })
                })
            }
        }).catch((err) => {
            res.json({
                data: err,
                success: false
            })
        })


    }

    remove(req , res) {
        req.checkParams('id' , 'id is not valid').isMongoId()
        this.showValidationErrors(req, res).then((valid) => {
            if (valid) {
                this.model.Contact.findOneAndDelete({_id: req.params.id , user: req.user._id} , (err, contact) => {
                    if (err) throw err;
                    if (contact) {
                        return res.json({
                            data : 'Contact Deleted',
                            success : true

                        })
                    }
                    return res.json({
                        message : 'Contact Not Found',
                        success : false
                    })
                })
            }
        }).catch((err) => {
            res.json({
                data: err,
                success: false
            })
        })

    }
}
