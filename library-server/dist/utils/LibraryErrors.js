"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUsernameOrPasswordError = exports.UnableToSaveUserError = void 0;
/**
 * Custom error class representing an error when an attempt to save a user fails.
 */
class UnableToSaveUserError extends Error {
    /**
 * Constructor for the error class.
 * @param message - The error message describing the reason for the failure.
 */
    constructor(message) {
        super(message);
    }
}
exports.UnableToSaveUserError = UnableToSaveUserError;
/**
 * Custom error class for invalid username or password errors.
 */
class InvalidUsernameOrPasswordError extends Error {
    /**
 * Initializes a new instance of the InvalidUsernameOrPasswordError class with a custom error message.
 * @param message The error message to display.
 */
    constructor(message) {
        super(message);
    }
}
exports.InvalidUsernameOrPasswordError = InvalidUsernameOrPasswordError;
