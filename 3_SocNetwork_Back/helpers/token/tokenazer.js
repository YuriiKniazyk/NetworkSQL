const jwt = require('jsonwebtoken');
const config = require('../../constant/config');

module.exports.login = (data) => jwt.sign(data, config.secret, {expiresIn: '30d'});
