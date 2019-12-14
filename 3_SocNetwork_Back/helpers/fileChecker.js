const fs = require('fs');
const uuid = require('uuid/v4');
const {resolve: resolvePath} = require('path');
const mimeTypes = require('../constant/mimeTypes');
const ControllerError = require('../error/ControllerError');

module.exports = async (files, id, type) => {
    try {
        const {photo, file} = files;

        if(!photo || Array.isArray(photo)) {
            throw new ControllerError('Photo must be photo', 401, 'fileChecker');
        }

        const {name, mimetype, size} = photo;
        if(!mimeTypes.PHOTOS.includes(mimetype)) {
            throw new ControllerError('Photo must have correct mime-type');
        }
        if(size > 5 * 1024 * 1024 || size < 1) {
            throw new ControllerError('Size must be less 5mb');
        }

        fs.mkdirSync(resolvePath(`${appRoot}/public/${type}/${id}`), {recursive: true});

        const photoName = uuid() + '.' + name.split('.').pop();
        photo.path = `${type}/${id}/${photoName}`;
        photo.name = photoName;

        return {
            file,
            photo
        }
    } catch (e) {
        throw new ControllerError(e.message, e.status, 'fileChecker');
    }
};