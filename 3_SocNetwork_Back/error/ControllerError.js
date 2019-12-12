module.exports = class ControllerError extends Error {

    constructor(msg, status, controller) {
        super(msg);
        this.name = 'Controller Error';
        (this.parent) ? this.message = this.parent.sqlMessage : this.message = msg;
        this.status = status;
        this.controller = controller;
        Error.captureStackTrace(this, this.constructor);
    }
};