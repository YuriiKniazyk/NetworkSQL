const Sequalize = require('sequelize');
const Op = require('sequelize').Op;
const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const friendModel = await db.getModel('friend');  
        const userId = req.body.curentUser.id;
        let {limit = 20, page = 1} = req.query;  
        
            if(+page === 0) page = 1;
                page = page - 1;

        const resObj = {};
        const offset = page * limit;
        
        const friendCount = await friendModel.findOne({
            attributes: [[Sequalize.fn('COUNT', Sequalize.col('id')), 'count_of_friends']],
            where:{
                [Op.or]: [{
                    user_id: userId,
                },
                {
                    friend_id: userId,
                }]
            }
        });
      
        const allUsers = await friendModel.findAll({
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
        
        resObj.friends = allUsers;
        resObj.pageCount = Math.ceil(friendCount.dataValues.count_of_friends / limit);

        res.status(200).json({ 
            succses: true,
            msg: resObj
        });

    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};