const config = require('../../constant/config');
const db = require('../../db/index').getInstance();
const Op = require('sequelize').Op;
const tokenVerify = require('../../helpers/tokenVerify');

module.exports = async (req, res) => {
    try {
        const userModel = await db.getModel('user');
        const { name = '' } = req.query;
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

        if (!name) {
            const allUsers = await userModel.findAll({ attributes: ['id', 'name', 'surname'] });
            return res.json(allUsers);
        };

        const allUsers = await userModel.findAll({
            attributes: ['name', 'surname'],
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
