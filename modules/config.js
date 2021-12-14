const path = require('path');
module.exports = {
    port : 3733,
    mongoose : 'mongodb://localhost:27017/chalkboard',
    path : {
        controller : {
            api : path.resolve('./modules/controllers')
        } ,
        model : path.resolve('./modules/models'),
    }
}
