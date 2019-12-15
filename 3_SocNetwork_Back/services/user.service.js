const db = require('../db/index').getInstance();
const ControllerError = require('../error/ControllerError');
const queryBilder = require('../helpers/queryBilder');

class UserService {

    async createUser(userObj) {
        try {
            const UserModel = db.getModel('user');
            return await UserModel.create(userObj)
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/createUser');
        }
    }

    filterUsers(params) {
        try {
            const client = db.getClient();
            const query = queryBilder(params);

            return  client.query(query);
            
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/filterUsers');
        }
    }
    
    async updateUser(updateObj, userId) {
        try {
            const UserModel = db.getModel('user');
            return await UserModel.update(updateObj, {
                where: {
                    id: userId
                },
                returning: true
            });
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/updateUser');
        }
    }
}

module.exports = new UserService();