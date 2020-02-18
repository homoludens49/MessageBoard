const db = require('./connection');
const messages = db.get('messages');
const Joi = require('joi')

function getAll(){
    return messages.find()
};

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(255).required(),
    imageURL: Joi.string().uri({
        scheme: [
        /https?/
      ]
    })

})

function create(message){
    if(!message.username) message.username === "Anonymous";
    const result = Joi.validate(message, schema);
    if(result.error === null){
        message.created = new Date();
        return messages.insert(message)
    }else{
        return Promise.reject(result.error)
    }
    
}

module.exports = {
    getAll,
    create
};