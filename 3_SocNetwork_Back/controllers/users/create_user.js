const db = require('../../db/index').getInstance();
const config = require('../config');

module.exports = async (req, res) => {
    try{ 
        const userModel = db.getModel('user')
        const {name, surname, password, email} = req.body;

        const insertedUser = await userModel.create({
            name,
            surname,
            email,
            password
        });
        res.json(insertedUser);
    } 
        catch(e){
            console.log(e);
            res.status(400).json(e.message);
    }
    
};
