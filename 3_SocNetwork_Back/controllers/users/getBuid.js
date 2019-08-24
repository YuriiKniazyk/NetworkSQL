const db = require('../../db/index').getInstance();
const Op = require('sequelize').Op;
const tokenVerify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const userId = req.params.id;
        const token = req.get('Authorization');

        if (!token) throw new Error('No token');
        const { id, name: userName } = tokenVerify(token);

        const isUserReg = await userModel.findOne({
            where: {
                id,
                name: userName
            }
        });
        if (!isUserReg) throw new Error('User is not valid!!!');

        if (!userId) {
            const allUsers = await userModel.findAll({attributes: ['id', 'name', 'surname']});
            return res.json(allUsers);
        };

        const allUsers = await userModel.findAll({
            attributes: ['id', 'name', 'surname'],
            where: {
                [Op.and]: {
                    id: {
                        [Op.like]: `%${userId}%`
                    }
                }        
            }
        });

        res.status(200).json({
            succses: true,
            accessUser: allUsers
        });

    } catch (e) {
        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};
