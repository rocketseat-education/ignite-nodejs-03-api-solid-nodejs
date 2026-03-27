export class UserAlreadyExistError extends Error {
    constructor() {
        super('Email already exists')
    }
}