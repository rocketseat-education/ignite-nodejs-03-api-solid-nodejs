export class SameDayCheckInError extends Error {
  constructor() {
    super('Cannot check-in twice on the same day.')
  }
}
