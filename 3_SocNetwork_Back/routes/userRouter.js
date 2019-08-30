const router = require('express').Router();
const createUser = require('../controllers/users/create_user');
const getById = require('../controllers/users/getBuid');
const getByName = require('../controllers/users/getByname');
const token = require('../helpers/token/token');
const profileUser = require('../controllers/users/profileUser');

router.post('/', createUser);
router.get('/profile', token.login, profileUser);
router.get('/:id', token.login, getById);
router.get('/', token.login, getByName);

module.exports = router;
