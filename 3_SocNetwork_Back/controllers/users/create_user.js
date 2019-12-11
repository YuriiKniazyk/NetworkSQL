const db = require('../../db/index').getInstance();
const crypto = require('crypto');

module.exports = async(req, res) => {
    try {
        const userModel = db.getModel('user');
        const photoModel = db.getModel('photo');

        const { name, surname, password, email } = req.body;
        const {photo} = req.files;

        if (!name || !surname || !password || !email) throw new Error('Some field is empty!');

        let hash = crypto.createHash('md5').update(password).digest('hex');

        const insertedUser = await userModel.create({
            name,
            surname,
            email,
            password: hash
        });

        const {id} = insertedUser.dataValues;
        await  photoModel.create({
            user_id: id,
            path: photo[0].path
        });

        res.status(200).json({
            succses: true,
            msg: 'OK',
            user: insertedUser
        });
    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};