const router = require('express').Router();
const token = require('../middlewares/checkToken');
const addNewFriend = require('../controllers/friends/addNewFriend');
const deleteFriend = require('../controllers/friends/deleteFriend');
const getAllFriend = require('../controllers/friends/getAllFriend');

router.post('/:id', token.login, addNewFriend);
router.delete('/:id', token.login, deleteFriend);
router.get('/', token.login, getAllFriend);

module.exports = router;