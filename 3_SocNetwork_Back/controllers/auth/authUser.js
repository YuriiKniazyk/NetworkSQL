const db = require('../../db/index').getInstance();
const tokenazer = require('../../helpers/tokenazer');
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const UserModel = db.getModel('user');
        const { email = '', password = '' } = req.body;

        if (!email || !password) throw new Error('Some field is empty!');

        let hash = crypto.createHash('md5').update(password).digest('hex');
        const isUserReg = await UserModel.findOne({
            where: {
                email,
                password: hash
            }
        });

        if (!isUserReg) throw new Error('You are not register!!!');

        const { id, name } = isUserReg;
        let token = tokenazer({ id, name });

        res.status(200).json({
            succses: true,
            token: {
                accessToken: token,
                type: 'Bearer'    
            }
        });

    } catch (e) {
        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
}