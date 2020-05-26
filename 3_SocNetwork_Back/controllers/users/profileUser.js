const ControllerError = require('../../error/ControllerError');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const userId = req.body.curentUser.id;
                
        if (!userId) {
            throw new ControllerError('Profile not found', 404, 'users/profileUser');
        }
        
        const userById = await userService.findUserById(userId);
        const user = {
            id: userById.id,
            name: userById.name,
            surname: userById.surname
        }

        res.status(200).json({
            success: true,
            accessUser: user
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'profileUser'));
    }
};
