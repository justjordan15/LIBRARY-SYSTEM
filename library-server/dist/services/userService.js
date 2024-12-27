"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
// Import the bcrypt library for password hashing
const bcrypt_1 = __importDefault(require("bcrypt"));
// Import the application configuration
const config_1 = require("../config");
// Import the UserDao class, which provides data access object (DAO) functionality for users,
// and the IUserModel interface, which defines the shape of a user model.
const UserDao_1 = __importDefault(require("../daos/UserDao"));
// Import custom error classes, which provide more specific and informative error messages.
// UnableToSaveUserError is thrown when a user cannot be saved to the database.
// InvalidUsernameOrPasswordError is thrown when a username/password combination is invalid.
const LibraryErrors_1 = require("../utils/LibraryErrors");
const LibraryErrors_2 = require("../utils/LibraryErrors");
/**
 * Registers a new user with the provided user object.
 * Hashes the user's password using bcrypt before saving to the database.
 *
 * @param user The user object to register
 * @returns The saved user object with hashed password
 */
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the number of rounds for bcrypt hashing from the application configuration
        const ROUNDS = config_1.config.server.rounds;
        try {
            // Hash the user's password using bcrypt
            const hashedPassword = yield bcrypt_1.default.hash(user.password, ROUNDS);
            // Create a new UserDao object with the hashed password
            const saved = new UserDao_1.default(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            // Save the user object to the database
            return yield saved.save();
        }
        catch (error) {
            // If an error occurs during registration, throw a custom error
            throw new LibraryErrors_1.UnableToSaveUserError(error.message);
        }
    });
}
/**
 * Logs in a user with the provided email and password.
 * Checks if the provided password matches the hashed password stored in the database.
 *
 * @param credentials The user's email and password
 * @returns The user object if login is successful
 */
function login(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = credentials;
        try {
            // Find a user with the provided email in the database
            const user = yield UserDao_1.default.findOne({ email });
            if (!user) {
                // If no user is found, throw a custom error
                throw new LibraryErrors_2.InvalidUsernameOrPasswordError("Invalid username or password");
            }
            else {
                // Compare the provided password with the hashed password stored in the database
                const validPassword = yield bcrypt_1.default.compare(password, user.password);
                if (validPassword) {
                    // If the passwords match, return the user object
                    return user;
                }
                else {
                    // If the passwords do not match, throw a custom error
                    throw new LibraryErrors_2.InvalidUsernameOrPasswordError("Invalid username or password");
                }
            }
        }
        catch (error) {
            // If an error occurs during login, rethrow the error
            throw error;
        }
    });
}
