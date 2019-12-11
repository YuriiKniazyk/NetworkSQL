const router = require('express').Router();
const createUser = require('../controllers/users/create_user');
const getById = require('../controllers/users/getBuid');
const getByName = require('../controllers/users/getByname');
const token = require('../helpers/token/token');
const profileUser = require('../controllers/users/profileUser');

const multer = require('multer');
const uuid = require('uuid/v4');
const {IMAGES} = require('../constant/extensions');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (IMAGES.includes(file.mimetype)) {
            cb(null, 'public/photos');
        } else {
            cb('UNKNOWN FILE, null');
        }
    },
    filename: (req, file, cb) => {
        cb(null, uuid() + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({storage});

router.post('/', upload.fields([{name: 'photo', maxCount: 1}]),createUser);
router.get('/profile', token.login, profileUser);
router.get('/:id', token.login, getById);
router.get('/', token.login, getByName);

module.exports = router;
