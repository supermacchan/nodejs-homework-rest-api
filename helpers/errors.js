class ContactListAppError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
    }
}

class ValidationError extends ContactListAppError {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}

class NotFoundError extends ContactListAppError {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class RegistrationConflictError extends ContactListAppError {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

class AuthorizationError extends ContactListAppError {
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