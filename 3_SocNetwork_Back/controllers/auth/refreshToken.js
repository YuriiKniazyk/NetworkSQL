const ControllerError = require('../../error/ControllerError');
const tokenazer = require('../../helpers/token/tokenazer');
const tokenVerify = require('../../helpers/token/tokenVerify');

module.exports = (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(!token) throw new ControllerError('No token', 401, 'auth/refreshToken');

        const user = tokenVerify.refresh(token);
        delete user.exp, user.iat;
        const tokens = tokenazer.login(user);

        res.json({
            success: true,
            tokens
        });
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'refreshToken'));
    }
};