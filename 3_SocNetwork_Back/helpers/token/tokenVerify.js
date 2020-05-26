const jwt = require('jsonwebtoken');
const config = require('../../constant/config');
const ControllerError = require('../../error/ControllerError');

module.exports.login = (token) => {
    let user = null;

    jwt.verify(token, config.secret, (err, decode) => {
        if (err) throw new ControllerError('Token is no valid!!!', 400, 'helpers/token/tokenVerify');
        user = decode;
    });
    return user;
};

module.exports.refresh = (token) => {
    let user = null;

    jwt.verify(token, config.refreshSecret, (err, decode) => {
        if (err) throw new ControllerError('Token is no valid!!!', 400, 'helpers/token/tokenVerify');
        user = decode;
    });
    return user;
};