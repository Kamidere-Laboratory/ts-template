export class InvalidConfigError extends Error {
  message = "InvalidConfig";
  name = "InvalidConfigError";
  constructor() {
    super();
  }
}
