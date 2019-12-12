const db = require('../../db/index').getInstance();
const crypto = require('crypto');
const ControllerError = require('../../error/ControllerError');

module.exports = async(req, res, next) => {
    try {
        const userModel = db.getModel('user');
        const photoModel = db.getModel('photo');

        const { name, surname, password, email } = req.body;

        if (!name || !surname || !password || !email) new ControllerError('Some field is empty!', 400);

        let hash = crypto.createHash('md5').update(password).digest('hex');

        const insertedUser = await userModel.create({
            name,
            surname,
            email,
            password: hash
        });

        if(req.files) {
            const {photo} = req.files;
            const {id} = insertedUser.dataValues;

            await  photoModel.create({
                user_id: id,
                path: photo[0].path
            });
        }
        delete insertedUser.dataValues.password;
        res.status(200).json({
            succses: true,
            user: insertedUser
        });
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'createUser'));
    }
};