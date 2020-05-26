const {friendService, userService} = require('../../services');
const ControllerError = require('../../error/ControllerError');

module.exports = async (req, res, next) => {
    try {
        const userId = req.body.curentUser.id;

        const userToAdd = req.params.id;
        if(!userToAdd || userToAdd < 1) throw new ControllerError('Bad user id', 400, 'friends/addNewFriend');

        const isUserToAdd = await userService.findUserById(userToAdd);
        if(!isUserToAdd) throw new ControllerError('This user not exist', 400, 'friends/addNewFriend');

        if(userToAdd == userId) throw new ControllerError('Sorry, bat you dont friend with yours', 400, 'friends/addNewFriend');

        const isFriend = await friendService.addToFriendFindOneFriend(userId, userToAdd);
        if(isFriend) throw new ControllerError('You are friend', 400, 'friends/addNewFriend');
        
        await friendService.createFriend(userId, userToAdd);

        res.status(200).json({ 
            success: true,
            msg: 'ok'
        });
        
    } catch (e) {
        next(new ControllerError(e.message, e.status, 'addNewFriend'));
    }
};