const db = require('../../db/index').getInstance();
const tokenazer = require('../../helpers/token/tokenazer');
const crypto = require('crypto');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const UserModel = db.getModel('user');
        const { email, password } = req.body;       
        
        if (!email || !password) new ControllerError('Some field is empty!', 400);

        let hash = crypto.createHash('md5').update(password).digest('hex');
        
        const isUserReg = await UserModel.findOne({
            where: {
                email,
                password: hash
            }
        });

        if (!isUserReg) new ControllerError('You are not register!!!', 400);

        const { id, name } = isUserReg;
        let token = tokenazer.login({ id, name });

        res.status(200).json({
            succses: true,
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