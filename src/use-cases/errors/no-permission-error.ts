export class NoPermissionError extends Error {
  constructor() {
    super('You have no permissions to execute this action.')
  }
}
