const db = require('../db/index').getInstance();
const Op = require('sequelize').Op;
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

    async createPhoto(photoObj) {
        try {
            const photoModel = db.getModel('photo');
            return await photoModel.create(photoObj)
        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/createUser');
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

    filterUsers(params) {
        try {
            const client = db.getClient();
            const query = queryBilder(params);

            return  client.query(query);

        } catch (e) {
            throw new ControllerError(e.parent.sqlMessage, 500, 'userService/filterUsers');
        }
    }

    findUserByParams (userObj) {
        const UserModel = db.getModel('user');
        return UserModel.findAll({where: userObj});
    }

    findUserByName (name) {
        const UserModel = db.getModel('user');
        return UserModel.findAll({
            attributes: ['id', 'name', 'surname'],
            where: {
                [Op.or]: [{
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                {
                    surname: {
                        [Op.like]: `%${name}%`
                    }

                }]
            }
        });
    }

    findUserById (userId) {
        const UserModel = db.getModel('user');
        return UserModel.findByPk(userId);
    }

    findPhoto (userId) {
        const PhotoModel = db.getModel('photo');
        return PhotoModel.findAll({
            where: {
                user_id: userId
            }
        })
    }

}

module.exports = new UserService();