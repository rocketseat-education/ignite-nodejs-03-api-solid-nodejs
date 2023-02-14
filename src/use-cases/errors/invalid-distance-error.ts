export class InvalidDistanceError extends Error {
  constructor() {
    super('It is not possible to check in at distant gyms.')
  }
}
