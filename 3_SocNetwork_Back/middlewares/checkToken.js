const tokenVerify = require('../helpers/token/tokenVerify');
const db = require('../db').getInstance();
const controllerError = require('../error/ControllerError');

module.exports = {
    
    login: async (req, res, next) => {
        try {
            const userModel = db.getModel('user');
            const token = req.get('Authorization');
            
            if (!token) throw new controllerError('No Authorization!!!', 401, 'checkToken');
            let parts = token.split(' ');
    
            let accsesToken = parts[1];
            if (!accsesToken) throw new controllerError('No token!!!', 401, 'checkToken');
    
            const { id, name } = tokenVerify.login(accsesToken);
            
            const isUserReg = await userModel.findOne({
                where: {
                    id,
                    name
                }
            });
            
            if (!isUserReg) throw new Error('User is not valid!!!');
    
            req.body.curentUser = {id, name};
            next();

        } catch(e) {
            next(new controllerError((e.message, e.status, 'checkToken')));
        }        
    }

};
