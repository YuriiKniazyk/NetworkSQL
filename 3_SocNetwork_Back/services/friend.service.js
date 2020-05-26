const Sequelize = require('sequelize');
const db = require('../db/index').getInstance();
const Op = require('sequelize').Op;
const ControllerError = require('../error/ControllerError');

class FriendService {
    addToFriendFindOneFriend (userId, userToAdd) {
        const friendModel = db.getModel('friend');
        return friendModel.findOne({
            where:{
                [Op.or]: [{
                    user_id: userId,
                    friend_id: userToAdd
                },
                    {
                        friend_id: userId,
                        user_id: userToAdd
                    }]
            }
        })
    }

    createFriend (userId, userToAdd) {
        const friendModel = db.getModel('friend');
        return friendModel.create({
            user_id: userId,
            friend_id: userToAdd
        });
    }

    findOneFriend (userId) {
        const friendModel = db.getModel('friend');
        return friendModel.findOne({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count_of_friends']],
            where:{
                [Op.or]: [{
                    user_id: userId,
                },
                {
                    friend_id: userId,
                }]
            }
        });
    }

    findAllFriend (userId, limit, offset) {
        const userModel = db.getModel('user');
        const friendModel = db.getModel('friend');

        return friendModel.findAll({
            attributes: [],
            where: {
                [Op.or]: [{
                    user_id: userId,
                },
                {
                    friend_id: userId,
                }]
            },
            include: [{
                model: userModel,
                attributes: ['name', 'surname']
            }],
            limit: +limit,
            offset
        });
    }

    deleteFromFriend (userId, userToAdd) {
        const friendModel = db.getModel('friend');
        return friendModel.destroy({
            where:{
                [Op.or]: [{
                    user_id: userId,
                    friend_id: userToAdd
                },
                {
                    friend_id: userId,
                    user_id: userToAdd
                }]
            }
        });
    }
}

module.exports = new FriendService();