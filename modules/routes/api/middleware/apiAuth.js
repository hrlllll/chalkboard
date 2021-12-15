const jwt = require('jsonwebtoken')
const User = require(`${config.path.model}/user`);


module.exports =
    (req ,res , next) => {
        let token = req.body.token || req.query.token || req.headers['x-auth-token'];
        if (token) {
           return jwt.verify(token , config.secret , (err, decode) => {
                if (err) {
                    return res.json({
                        success : false ,
                         data : 'Failed to authenticate token. '
                    })
                }
                 User.findOne({_id : decode.user_id}).then((user) => {
                     if (user) {

                         req.user = user;
                         next();
                     }
                     else {
                         return res.json({
                             success : false ,
                             data : 'Failed to authenticate token. '
                         })
                     }
                }).catch((e) => {
                     console.log(e)
                     return res.json({
                         success : false ,
                         data : e
                     })
                })

            })

        }
        return res.status(403).json({
            data : 'No Token Provided',
            success: false
        })
    }
