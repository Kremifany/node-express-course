const CustomAPIError = require("./custom-error")
const { StatusCodes } = require("http-status-codes");

const UnauthenticatedError = require("./custom-error");
class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
