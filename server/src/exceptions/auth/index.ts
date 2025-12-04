export class InvalidCredentialsException extends Error {
    status = 401;
    constructor(message: string = 'auth.invalid_credentials') {
        super(message);
        this.name = 'InvalidCredentials';
        this.message = message;
    }
}

export class UserExistException extends Error {
    status = 409;
    constructor(message?: string) {
        super(message);
        this.name = "UserExistException";
        this.message = message ?? 'auth.user_exists';
    }
}

export class UnauthorizedException extends Error {
    status = 401;
    constructor(message: string = 'auth.unauthorized') {
        super(message);
        this.name = 'UnauthorizedException';
        this.message = message;
    }
}

export class ForbiddenException extends Error {
    status = 403;
    constructor(message: string = 'auth.forbidden') {
        super(message);
        this.name = 'ForbiddenException';
        this.message = message;
    }
}

export class TokenExpiredException extends Error {
    status = 401;
    constructor(message: string = 'auth.token_expired') {
        super(message);
        this.name = 'TokenExpiredException';
        this.message = message;
    }
}

export class InvalidTokenException extends Error {
    status = 401;
    constructor(message: string = 'auth.invalid_token') {
        super(message);
        this.name = 'InvalidTokenException';
        this.message = message;
    }
}

export class UserNotFoundException extends Error {
    status = 404;
    constructor(message: string = 'auth.user_not_found') {
        super(message);
        this.name = 'UserNotFoundException';
        this.message = message;
    }
}