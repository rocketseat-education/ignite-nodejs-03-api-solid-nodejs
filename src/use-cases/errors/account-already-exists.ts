export class AccountAlreadyExists extends Error {
  constructor() {
    super('Another account with same credentials already exists.')
  }
}
