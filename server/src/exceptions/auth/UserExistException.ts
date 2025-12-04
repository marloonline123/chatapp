import { t } from "i18next";

class UserExistException extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "UserExistException";
        this.message = message ?? 'auth.user_exists';
    }
}

export default UserExistException;