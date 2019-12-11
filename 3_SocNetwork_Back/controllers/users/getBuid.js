const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const photoModel = await db.getModel('photo');
        const userId = req.params.id;
        
        if (!userId) {            
            return res.status(200).json({
                succses: true,
                accessUser: []
            });
        };
        
        const userByid = await userModel.findByPk(userId);
        const photos = await photoModel.findAll({
            where: {
                user_id: userId
            }
        });

        if(!userByid) throw  new Error('User is not found');
        userByid.dataValues.photos = photos;

        const user = {
            id: userByid.id,
            name: userByid.name,
            surname: userByid.surname,
            photo: userByid.dataValues.photos
        };

        res.status(200).json({
            succses: true,
            accessUser: user
        });

    } catch (e) {
        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};
