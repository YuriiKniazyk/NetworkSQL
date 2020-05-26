const crypto = require('crypto');
const {userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        let {email, password, passwordVerify, forgotecodes} = req.body;

        const user = await userService.findUserByParams({ email, forgotecodes });
        if(user.length < 1) throw new ControllerError('User is not register!!!', 400, 'auth/changePassword');

        if (!password || !passwordVerify || password !== passwordVerify) throw new ControllerError('Wrong password or passwordVerify', 400, 'auth/changePassword');
        let hash = crypto.createHash('md5').update(password).digest('hex');
        
        await userService.updateUser({password: hash}, {id: user.id});

        res.status(200).json({ 
            success: true,
            msg: 'ok'
        });
        
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'changePassword'));
    }
};