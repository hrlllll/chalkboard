
const Contact = require(`${config.path.model}/contact`);
const User = require(`${config.path.model}/user`);

module.exports =  class Controller {
    constructor() {
        this.model = { Contact , User }
    }

    showValidationErrors(req , res) {
        return new Promise((resolve , reject) => {
            let errors = req.validationErrors();
            if (errors) {
                res.status(422).json({
                    message : errors.map(error => {
                        return {
                            'field' : error.param ,
                            'message' : error.msg
                        }
                    }),
                    success : false
                });
                reject(false);
            }
            resolve(true)

        })

    }
}
