const jwt = require('jsonwebtoken');
const config = require('../constant/config');

module.exports = (data) => jwt.sign(data, config.secret, {expiresIn: '30d'});