const sendEmail = require('../../helpers/sendEmailChangePassword');
const {userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const {email} = req.body;
        if(!email) throw new ControllerError('Enter email', 400, 'auth/sendChangeEmail');

        const user = await userService.findUserByParams({email});
        if(user.length < 1) throw new ControllerError('User is not register!!!!', 400, 'auth/sendChangeEmail');

        let randomCodes = Math.round(Math.random() * (999999 - 111111) + 111111);
        await userService.updateUser({forgotecodes: randomCodes}, {id: user.id});

        await sendEmail(email, randomCodes);

        res.status(200).json({ 
            success: true,
            msg: 'ok'
        });
        
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'sendChangeEmail'));
    }
};