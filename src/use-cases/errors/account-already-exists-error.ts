export class AccountAlreadyExistsError extends Error {
  constructor() {
    super('Another account with same credentials already exists.')
  }
}
