import { number } from "joi";

/**
 * Custom error class representing an error when an attempt to save a user fails.
 */
export class UnableToSaveUserError extends Error{
        /**
     * Constructor for the error class.
     * @param message - The error message describing the reason for the failure.
     */
    constructor(message:string){
        super(message);
    }
}


/**
 * Custom error class for invalid username or password errors.
 */
export class InvalidUsernameOrPasswordError extends Error{
        /**
     * Initializes a new instance of the InvalidUsernameOrPasswordError class with a custom error message.
     * @param message The error message to display.
     */
    constructor(message:string){
        super(message);
    }
}