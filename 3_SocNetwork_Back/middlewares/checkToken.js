const tokenVerify = require('../helpers/token/tokenVerify');
const controllerError = require('../error/ControllerError');
const {userService} = require('../services');

module.exports = {
    
    login: async (req, res, next) => {
        try {
            const token = req.get('Authorization');
            
            if (!token) throw new controllerError('No Authorization!!!', 401, 'checkToken');
            let parts = token.split(' ');
    
            let accessToken = parts[1];
            if (!accessToken) throw new controllerError('No token!!!', 401, 'checkToken');
    
            const { id, name } = tokenVerify.login(accessToken);

            const isUserReg = await userService.findUserByParams({id, name});
            if (isUserReg.length < 1) throw new controllerError('User is not valid!!!', 401, 'checkToken');
    
            req.body.curentUser = {id, name};
            next();

        } catch(e) {
            next(new controllerError(e.message, e.status, 'checkToken'));
        }        
    }

};
