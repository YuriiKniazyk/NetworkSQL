const router = require('express').Router();
const createUser = require('../controllers/users/create_user');
const getById = require('../controllers/users/getBuid');
const getByName = require('../controllers/users/getByname');
const token = require('../middlewares/checkToken');
const profileUser = require('../controllers/users/profileUser');
const filterUser = require('../controllers/users/filterUser');

router.post('/',createUser);
router.get('/filter', token.login, filterUser);
router.get('/profile', token.login, profileUser);
router.get('/:id', token.login, getById);
router.get('/', token.login, getByName);

module.exports = router;
