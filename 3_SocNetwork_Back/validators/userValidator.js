const joi = require('joi');
const config = require('../constant/config');

module.exports = joi.object().keys({
    name: joi.string().alphanum().min(1).max(50).required(),
    surname: joi.string().alphanum().min(1).max(50).required(),
    password: joi.string().min(4).max(50).regex(config.strongRegex).required(),
    email: joi.string().email().required(),
    city: joi.string().min(2).max(50),
    photo: joi.string().min(10).max(200),
    birthDay: joi.string().min(4).max(15)
});