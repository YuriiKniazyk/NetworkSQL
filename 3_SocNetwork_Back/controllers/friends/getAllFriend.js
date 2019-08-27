const db = require('../../db/index').getInstance();

module.exports = async (req, res) => {
    try {
        const friendModel = await db.getModel('friend');        
        
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