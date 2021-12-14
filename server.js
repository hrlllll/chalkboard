const app = require('express')();
const  expressValidator  = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
global.config = require('./modules/config');

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json({type : 'application/json'}));
app.use(expressValidator());

//Connect to Db
mongoose.connect( config.mongoose , {useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const apiRouter = require('./modules/routes/api')


app.use('/api' , apiRouter)


app.listen(config.port , () => {
    console.log(`Server running at port ${config.port}`)
})
