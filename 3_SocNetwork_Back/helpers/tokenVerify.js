const jwt = require('jsonwebtoken');
const config = require('../constant/config');

module.exports = (token) => {
    let user = null;

    jwt.verify(token, config.secret, (err, decode) => {

        if (err) throw new Error('Token is no valid!!!');
        console.log(decode);
        
        user = decode;
    });
    return user;
}