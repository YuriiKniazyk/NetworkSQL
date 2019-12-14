const crypto = require('crypto');
const {resolve: resolvePath} = require('path');
const db = require('../../db/index').getInstance();
const ControllerError = require('../../error/ControllerError');
const fileChecker = require('../../helpers/fileChecker');
const {USERS} = require('../../constant/fileDirEnum');
const {userService} = require('../../services');

module.exports = async(req, res, next) => {
    try {
        const userModel = db.getModel('user');
        const photoModel = db.getModel('photo');

        const { name, surname, password, email } = req.body;
        const {photo} = req.files;

        if (!name || !surname || !password || !email) throw new ControllerError('Some field is empty!', 400);

        const isUserPresent = await userModel.findOne({

            where: {
                email
            }
        });

        if (isUserPresent) {
            throw new ControllerError('User already registered', 400);
        }

        let hash = crypto.createHash('md5').update(password).digest('hex');

        const insertedUser = await userService.createUser({
            name,
            surname,
            email,
            password: hash
        });

        const {id} = insertedUser.dataValues;
        if(photo) {
            const {photo: goodPhoto} = await fileChecker(req.files, id, USERS);

            goodPhoto.mv(resolvePath(`${appRoot}/public/${goodPhoto.path}`));

            await  photoModel.create({
                user_id: id,
                path: goodPhoto.path,
                name: goodPhoto.name
            });
        }
        delete insertedUser.dataValues.password;

        res.status(200).json({
            succses: true,
            user: insertedUser,
            avatar: {
                path: photo.path,
                name: photo.name
            }
        });
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'createUser'));
    }
};