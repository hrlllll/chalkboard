const path = require('path');
module.exports = {
    port : 3733,
    secret : 'wsbhnoqe@!#@T#EGHWRHrwshmwopemhgweomgy%@!%!#^Y#@YEWgewg',
    mongoose : 'mongodb://mongo:27017/chalkboard',
    path : {
        controller : {
            api : path.resolve('./modules/controllers')
        } ,
        model : path.resolve('./modules/models'),
        transform : path.resolve('./modules/transforms')
    }
}
