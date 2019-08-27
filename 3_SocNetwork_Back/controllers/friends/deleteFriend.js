const Op = require('sequelize').Op;
const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const friendModel = await db.getModel('friend'); 
        const userId = req.body.curentUser.id;

        const userToAdd = req.params.id;
        if(!userToAdd || userToAdd < 1) throw new Error('Bad user id');
        
        await friendModel.destroy({
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
        
        const allFriend = await friendModel.findAll({
            include: [userModel]
        });

        res.status(200).json({ 
            succses: true,
            msg: allFriend
        });

    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};