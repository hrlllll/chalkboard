
const Contact = require(`${config.path.model}/contact`);
const User = require(`${config.path.model}/user`);

module.exports =  class Controller {
    constructor() {
        this.model = { Contact , User }
    }
}
