const express = require('express');
const router = express.Router();


//controllers
const {api : ControllerApi } = config.path.controller
const userController = require(`${ControllerApi}/v1/userController`)
const contactController = require(`${ControllerApi}/v1/contactController`)

    //Authentication
    const authentication = express.Router();
    authentication.post('/register' , userController.register.bind(authentication));
    authentication.post('/login' , userController.login.bind(authentication));
    router.use('/user' , authentication);

    //Contact crud
    const contact = express.Router();
    contact.get('/getList' , contactController.index.bind(contactController));
    contact.post('/new' , contactController.store.bind(contactController));
    contact.put('/edit/:id' , contactController.update.bind(contactController));
    contact.delete('/remove/:id' , contactController.remove.bind(contactController));
    router.use('/contact' , contact);

    module.exports = router;
