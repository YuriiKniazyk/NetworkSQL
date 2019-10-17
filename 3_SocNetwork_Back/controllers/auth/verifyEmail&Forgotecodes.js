const db = require('../../db/index').getInstance();
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        let {email, forgotecodes} = req.body;
        if(email === undefined) throw new Error('Please enter email!!!!');
        if(forgotecodes === undefined) throw new Error('Please enter forgotecodes!!!!');
        const user = await userModel.findOne({
            where: {
                email,
                forgotecodes
            }
        });        
        if(!user) throw new Error('Wrong data of user!!!!');
        
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