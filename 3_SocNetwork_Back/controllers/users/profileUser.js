const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const userId = req.body.curentUser.id;
        
        if (!userId) {                       
            res.json('Profile not found');
        };
        
        const userByid = await userModel.findByPk(userId);
        const user = {
            id: userByid.id,
            name: userByid.name,
            surname: userByid.surname
        }

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
