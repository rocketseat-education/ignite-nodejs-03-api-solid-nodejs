export class InvalidCredentialsError extends Error {
  constructor() {
    super('Provided credentials are not valid.')
  }
}
