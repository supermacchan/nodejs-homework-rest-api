class ContactListAppError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class RegistrationConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}


module.exports = {
    ContactListAppError,
    ValidationError,
    NotFoundError,
    RegistrationConflictError,
    AuthorizationError
}