const Transform = require('./Transform');
module.exports = class ContactTransform extends Transform{

    transform(item) {
        return {
            '_id' : item._id ,
            'createdAt' : item.createdAt ,
            'name' : item.name ,
            'phoneNumbers' : item.phoneNumbers ,
            'emailAddress' : item.emailAddress,
            'mailingAddress' : item.mailingAddress,
        }
    }
}
