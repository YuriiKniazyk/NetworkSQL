const router = require('express').Router();
const createUser = require('../controllers/users/create_user');
const getById = require('../controllers/users/getBuid');
const getByName = require('../controllers/users/getByname');
const token = require('../helpers/token');
const profileUser = require('../controllers/users/profileUser');

router.post('/', createUser);
router.get('/profile', token, profileUser);
router.get('/:id', token, getById);
router.get('/', token, getByName);

module.exports = router;
