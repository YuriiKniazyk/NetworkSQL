const router = require('express').Router();
const token = require('../helpers/token/token');
const authUser = require('../controllers/auth/authUser');
const updatePassword = require('../controllers/auth/updatePassword');
const changePassword = require('../controllers/auth/changePassword');
const sendChangeEmail = require('../controllers/auth/sendChangeEmail');

router.post('/user', authUser);
router.put('/user/changepassword', token.login, updatePassword);
router.post('/user/forgotpassword', sendChangeEmail);
router.put('/user/forgotchangepassword', changePassword);

module.exports = router;
