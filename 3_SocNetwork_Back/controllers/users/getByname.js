const db = require('../../db/index').getInstance();
const Op = require('sequelize').Op;

module.exports = async (req, res) => {
    try {
        
        const userModel = await db.getModel('user');
        const { name = '' } = req.query;
       
        if (!name) {
            return res.status(200).json({
                succses: true,
                accessUser: []
            });
        };

        const allUsers = await userModel.findAll({
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

        res.status(200).json({
            succses: true,
            allUser: allUsers
        });

    } catch (e) {

        res.status(400).json({
            succses: false,
            msg: e.message
        });
    }
};
