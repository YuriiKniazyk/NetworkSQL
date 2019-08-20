const db = require('../../db/index').getInstance();
const crypto = require('crypto');

module.exports = async (req, res) => {
    try{ 
        const userModel = db.getModel('user')
        const {name, surname, password, email} = req.body;

        let hash = crypto.createHash('md5').update(password).digest('hex');

        const insertedUser = await userModel.create({
            name,
            surname,
            email,
            password: hash            
        });

        res.json(insertedUser);
    } 
        catch(e){
            
            res.status(400).json(e.message);
    }
};