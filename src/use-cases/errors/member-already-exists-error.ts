export class MemberAlreadyExistsError extends Error {
  constructor() {
    super('Another member with same credentials already exists.')
  }
}
