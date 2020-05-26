const {userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const { name = '' } = req.query;
       
        if (!name) {
            return res.status(200).json({
                success: true,
                accessUser: []
            });
        }
        const allUsers = await userService.findUserByName(name);

        res.status(200).json({
            success: true,
            allUser: allUsers
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'getByName'));
    }
};
