const Op = require('sequelize').Op;
const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const friendModel = await db.getModel('friend');  
        const userId = req.body.curentUser.id;

        const userToAdd = req.params.id;
        if(!userToAdd || userToAdd < 1) throw new Error('Bad user id');
        if(userToAdd == userId) throw new Error('Soory, bat you dont friend with yours');
        const isFriend = await friendModel.findOne({
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

        if(isFriend) throw new Error('u are friend');
        
        await friendModel.create({
            user_id: userId,
            friend_id: userToAdd
        });

        res.status(200).json({ 
            succses: true,
            msg: 'ok'
        });
        
    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};