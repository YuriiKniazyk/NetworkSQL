const db = require('../../db').getInstance();
const ControllerError = require('../../error/ControllerError');
const {userService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const params = req.query;
        const filteredUsers = await userService.filterUsers(params);

        res.status(200).json({
            success: true,
            filteredUsers
        })
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'filterUser'));
    }
};