const {userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const {email, forgotecodes} = req.body;
        if(email === undefined) throw new ControllerError('Please enter email!!!!', 400, 'auth/verifyEmail&Forgotecodes');
        if(forgotecodes === undefined) throw new ControllerError('Please enter forgotecodes!!!!', 400, 'auth/verifyEmail&Forgotecodes');

        const user = await userService.findUserByParams({email, forgotecodes});
        if(user.length < 1) throw new ControllerError('Wrong data of user!!!!', 400, 'auth/verifyEmail&Forgotecodes');
        
        res.status(200).json({ 
            success: true,
            msg: 'ok'
        });
        
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'updatePassword'));
    }
};