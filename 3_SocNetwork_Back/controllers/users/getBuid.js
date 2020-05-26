const ControllerError = require('../../error/ControllerError');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(200).json({
                success: true,
                accessUser: []
            });
        }
        
        const userById = await userService.findUserById(userId);
        const photos = await userService.findPhoto(userId)

        if(!userById) throw new ControllerError('User is not found!', 400, 'users/getById');
        userById.dataValues.photos = photos;

        const user = {
            id: userById.id,
            name: userById.name,
            surname: userById.surname,
            photo: userById.dataValues.photos
        };

        res.status(200).json({
            success: true,
            accessUser: user
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'getById'));
    }
};
