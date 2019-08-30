const db = require('../../db/index').getInstance();
const sendEmail = require('../../helpers/sendEmailChangePassword');

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const {email} = req.body;
        
        const user = await userModel.findOne({
            where: {
                email
            }
        });        
        if(!user) throw new Error('User is not register!!!!');

        let randomCodes = Math.round(Math.random() * (999999 - 111111) + 111111);
        await userModel.update({
            forgotecodes: randomCodes
        },{
            where: {
                id: user.id
            } 
        });


       await sendEmail(email, randomCodes);

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