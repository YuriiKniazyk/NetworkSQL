const router = require('express').Router();
const token = require('../helpers/token');
const addNewFriend = require('../controllers/friends/addNewFriend');
const deleteFriend = require('../controllers/friends/deleteFriend');
const getAllFriend = require('../controllers/friends/getAllFriend');

router.post('/:id', token, addNewFriend);
router.delete('/:id', token, deleteFriend);
router.get('/:id', token, getAllFriend);

module.exports = router;