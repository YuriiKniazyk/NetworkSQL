const db = require('../../db/index').getInstance();
const crypto = require('crypto');

module.exports = async (req, res, next) => {
    try {
        const userModel = await db.getModel('user');
        const userId = req.body.curentUser.id;

        const { oldpassword: oldPassword, newPassword, verifyPassword } = req.body;
        if(!newPassword || !verifyPassword || newPassword !== verifyPassword) throw new Error('Please type your password!!! or cheked your new password!');
        
        let hash = crypto.createHash('md5').update(oldPassword).digest('hex');

        const user = await userModel.findOne({
            where: {
                id: userId,
                password: hash
            }
        });
        if (!user) throw new Error('You are not register!!!');

        const hashNewPassword = crypto.createHash('md5').update(newPassword).digest('hex');

        await userModel.update({
            password: hashNewPassword
        },{
            where: {
                id: userId
            } 
        });

        res.status(200).json({ 
            succses: true,
            msg: 'ok'
        });

    } catch (e) {
        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }

}