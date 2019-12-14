const db = require('../db/index').getInstance();
const ControllerError = require('../error/ControllerError');

class UserService {

    async createUser(userObj) {
        try {
            const UserModel = db.getModel('user');
            return await UserModel.create(userObj)
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/createUser');
        }
    }
}

module.exports = new UserService();