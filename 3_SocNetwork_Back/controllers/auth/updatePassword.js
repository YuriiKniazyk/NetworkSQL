const crypto = require('crypto');
const {userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const userId = req.body.curentUser.id;

        const { oldpassword: oldPassword, newPassword, verifyPassword } = req.body;
        if(!newPassword || !verifyPassword || newPassword !== verifyPassword) throw new ControllerError('Please type your password!!! or checked your new password!', 400, 'auth/updatePassword');
        
        let hash = crypto.createHash('md5').update(oldPassword).digest('hex');
        const user = await userService.findUserByParams({id: userId, password: hash});
        if(user.length < 1) throw new ControllerError('User is not register!!!!', 400, 'auth/updatePassword');

        const hashNewPassword = crypto.createHash('md5').update(newPassword).digest('hex');

        await userService.updateUser({ password: hashNewPassword }, {id: userId});

        res.status(200).json({ 
            success: true,
            msg: 'ok'
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'updatePassword'));
    }
}