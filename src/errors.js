export class AccountError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
