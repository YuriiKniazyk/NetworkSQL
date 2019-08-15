const router = require('express').Router();
const createUser = require('../controllers/users/create_user');
const getById = require('../controllers/users/getBuid');
const getByName = require('../controllers/users/getByname');

router.post('/', createUser);
router.get('/:id', getById);
router.get('/', getByName);

module.exports = router;
