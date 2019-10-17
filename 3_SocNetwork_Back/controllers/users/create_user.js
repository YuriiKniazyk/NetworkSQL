const db = require('../../db/index').getInstance();
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const userModel = db.getModel('user');
        const { name, surname, password, email } = req.body;
        
        if (!name || !surname || !password || !email) throw new Error('Some field is empty!');

        let hash = crypto.createHash('md5').update(password).digest('hex');

        await userModel.create({
            name,
            surname,
            email,
            password: hash
        });

        res.status(200).json({ 
            succses: true,
            msg: 'OK'
        });
    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};