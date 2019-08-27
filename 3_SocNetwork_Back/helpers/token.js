const tokenVerify = require('./tokenVerify');
const db = require('../db/index').getInstance();

module.exports = async (req, res, next) => {
    const userModel = db.getModel('user');

    const token = req.get('Authorization');

    if (!token) throw new Error('No Authorization!!!');
    let parts = token.split(' ');

    let accsesToken = parts[1];
    if (!accsesToken) throw new Error('No token!!!');

    const { id, name } = tokenVerify(accsesToken);
    
    const isUserReg = await userModel.findOne({
        where: {
            id,
            name
        }
    });

    if (!isUserReg) throw new Error('User is not valid!!!');

    req.body.curentUser = {id, name};     
    
    next();
}