const jwt = require('jsonwebtoken');
const config = require('../../constant/config');

module.exports.login = (data) => {
    return {
        accessToken: jwt.sign(data, config.secret, {expiresIn: '1d'}),
        refreshToken: jwt.sign(data, config.refreshSecret, {expiresIn: '30d'})
    }
};
