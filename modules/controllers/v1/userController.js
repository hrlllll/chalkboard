const Controller = require('./../controller');
const bcrypt = require('bcrypt');
const UserTransform = require(`${config.path.transform}/UserTransform`);

module.exports = new class UserController extends Controller{
    register(req , res) {
        req.checkBody('email' , 'Email is required').notEmpty()
        req.checkBody('email' , 'Email is not valid').isEmail()
        req.checkBody('password' , 'Password is required').notEmpty()
        req.checkBody('password' , 'Password length should be 3 to 10 characters').isLength({ min: 3, max: 10 })
        this.showValidationErrors(req, res).then((valid) => {
            if (valid) {
                this.model.User.create({
                    email : req.body.email,
                    password : req.body.password
                }).then((user) => {
                    res.json({
                        success : true,
                        data : new UserTransform().transform(user , true),
                    })
                }).catch((error) => {
                    if (error) {
                        if (error.code === 11000) {
                            res.json({
                                success : false,
                                data : 'User exist'
                            })
                        }
                        res.json({
                            success : false,
                            data : error
                        })
                    }
                })
            }
        }).catch((err) => {
            res.json({
                success : false,
                data : err
            })
        })


    }

    login(req , res) {
        req.checkBody('email' , 'Email is required').notEmpty()
        req.checkBody('email' , 'Email is not valid').isEmail()
        req.checkBody('password' , 'Password is required').notEmpty()
        this.showValidationErrors(req, res).then((valid) => {
            if (valid) {
                this.model.User.findOne({email : req.body.email} , (err, user) => {
                    if (err) throw err;
                    if (user === null) {
                        return res.status(422).json({
                            data : 'Invalid credentials' ,
                            success: false
                        });
                    }
                    bcrypt.compare(req.body.password , user.password , (err , status) => {
                        if (!status) {
                            return res.status(422).json({
                                data : 'Invalid credentials' ,
                                success: false
                            });
                        }
                        return res.status(200).json({
                            data : new UserTransform().transform(user , true),
                            success: true
                        });
                    })
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}
