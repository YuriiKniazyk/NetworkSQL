const {friendService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const userId = req.body.curentUser.id;
        let {limit = 20, page = 1} = req.query;  
        
            if(+page === 0) page = 1;
                page = page - 1;

        const resObj = {};
        const offset = page * limit;
        
        const friendCount = await friendService.findOneFriend(userId);
      
        const allUsers = await friendService.findAllFriend(userId, limit, offset)
        
        resObj.friends = allUsers;
        resObj.pageCount = Math.ceil(friendCount.dataValues.count_of_friends / limit);

        res.status(200).json({ 
            success: true,
            msg: resObj
        });

    } catch (e) {
        next(new ControllerError(e.message, e.status, 'getAllFriend'));
    }
};