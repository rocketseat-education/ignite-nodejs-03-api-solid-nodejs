export class MaxNumberOfCheckInsError extends Error {
    constructor() {
        super('Maximum number of check-ins exceeded')
    }
}