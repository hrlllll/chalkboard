const Controller = require('./../controller')

module.exports = new class UserController extends Controller{
    register(req , res) {

        req.checkBody('email' , 'Email is required').notEmpty()
        req.checkBody('email' , 'Email is not valid').isEmail()
        req.checkBody('password' , 'Password is required').notEmpty()
        req.checkBody('password' , 'Password length should be 3 to 10 characters').isLength({ min: 3, max: 10 })
        this.showValidationErrors(req, res).then((valid) => {
            console.log(valid)
            if (valid) {
                console.log('mahdio')
            }
        }).catch((err) => {
            console.log(err)
        })


    }

    login(req , res) {
        req.checkBody('email' , 'Email is required').notEmpty()
        req.checkBody('email' , 'Email is not valid').isEmail()
        req.checkBody('password' , 'Password is required').notEmpty()
        this.showValidationErrors(req, res).then((valid) => {
            if (valid) {
                console.log('mahdio')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}
