const crypto = require('crypto');
const {resolve: resolvePath} = require('path');
const joi = require('joi');
const db = require('../../db/index').getInstance();
const ControllerError = require('../../error/ControllerError');
const fileChecker = require('../../helpers/fileChecker');
const {USERS} = require('../../constant/fileDirEnum');
const {userService} = require('../../services');
const {userValidator} = require('../../validators');

module.exports = async(req, res, next) => {
    try {
        const photoModel = db.getModel('photo');

        const userObj = req.body;
        const isUserValid = joi.validate(userObj, userValidator);

        if(isUserValid.error) {
            throw new ControllerError(isUserValid.error.details[0].message, 400, 'users/createUser');
        }

        const isUserPresent = await userService.findUserByParams({email: userObj.email});
        if (isUserPresent.length) {
            throw new ControllerError('User already registered', 400, 'createUser');
        }

        userObj.password = crypto.createHash('md5').update(userObj.password).digest('hex');

        const insertedUser = await userService.createUser(userObj);
        const {id} = insertedUser.dataValues;

        if(req.files) {
            const {photo} = req.files;
            if(photo) {
                const {photo: goodPhoto} = await fileChecker(req.files, id, USERS);

                goodPhoto.mv(resolvePath(`${appRoot}/public/${goodPhoto.path}`));

                await  photoModel.create({
                    user_id: id,
                    path: goodPhoto.path,
                    name: goodPhoto.name
                });

                await userService.updateUser({photo: photo.path}, id);
            }
        }

        delete insertedUser.dataValues.password;

        res.status(200).json({
            succses: true,
            user: insertedUser
        });
    } catch (e) {
        console.log(e)
        next(new ControllerError(e.message, e.status, 'createUser'));
    }
};