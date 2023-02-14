export class LateCheckInValidateError extends Error {
  constructor() {
    super('Cannot validate check-ins after 20 minutes of its creation.')
  }
}
