const router = require('express').Router();
const token = require('../middlewares/token');
const authUser = require('../controllers/auth/authUser');
const updatePassword = require('../controllers/auth/updatePassword');
const changePassword = require('../controllers/auth/changePassword');
const sendChangeEmail = require('../controllers/auth/sendChangeEmail');
const verifyEmailForgotecodes = require('../controllers/auth/verifyEmail&Forgotecodes');
const refreshToken = require('../controllers/auth/refreshToken');

router.post('/user', authUser);
router.post('/user/refresh', refreshToken);
router.put('/user/changepassword', token.login, updatePassword);
router.post('/user/forgotpassword', sendChangeEmail);
router.post('/user/verifyemailforgotecodes', verifyEmailForgotecodes);
router.put('/user/forgotchangepassword', changePassword);

module.exports = router;
