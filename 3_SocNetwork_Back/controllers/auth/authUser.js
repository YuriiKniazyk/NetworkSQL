const crypto = require('crypto');
const tokenazer = require('../../helpers/token/tokenazer');
const {userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new ControllerError('Some field is empty!', 400, 'authUser');

        let hash = crypto.createHash('md5').update(password).digest('hex');

        const isUserReg = await userService.findUserByParams({email: email, password: hash });
        if (isUserReg.length < 1) throw new ControllerError('You are not register!!!', 400, 'authUser');

        const { id, name } = isUserReg;
        let token = tokenazer.login({ id, name });

        res.status(200).json({
            success: true,
            token: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                type: 'Bearer'    
            }
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'authUser'));
    }
};