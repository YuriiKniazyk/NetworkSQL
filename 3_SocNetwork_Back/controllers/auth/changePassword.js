const db = require('../../db/index').getInstance();
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        let {email, password, passwordVerify, forgotecodes} = req.body;
                      
        const user = await userModel.findOne({
            where: {
                email,
                forgotecodes
            }
        });        
        if(!user) throw new Error('User is not register!!!!');

        if (!password || !passwordVerify || password !== passwordVerify) throw new Error('Wrong password or passwordVerify');

        let hash = crypto.createHash('md5').update(password).digest('hex');
        
        await userModel.update({
            password: hash
        },{
            where: {
                id: user.id
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
};