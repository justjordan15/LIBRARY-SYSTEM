// Import the bcrypt library for password hashing
import bcrypt from 'bcrypt';

// Import the application configuration
import {config} from '../config';

// Import the UserDao class, which provides data access object (DAO) functionality for users,
// and the IUserModel interface, which defines the shape of a user model.
import UserDao, {IUserModel} from '../daos/UserDao';
import {IUser} from '../models/User';

// Import custom error classes, which provide more specific and informative error messages.
// UnableToSaveUserError is thrown when a user cannot be saved to the database.
// InvalidUsernameOrPasswordError is thrown when a username/password combination is invalid.
import {UnableToSaveUserError} from '../utils/LibraryErrors';
import { InvalidUsernameOrPasswordError } from '../utils/LibraryErrors';



/**
 * Registers a new user with the provided user object.
 * Hashes the user's password using bcrypt before saving to the database.
 *
 * @param user The user object to register
 * @returns The saved user object with hashed password
 */
export async function register(user:IUser):Promise<IUserModel> {
     // Get the number of rounds for bcrypt hashing from the application configuration
    const ROUNDS = config.server.rounds;

    try {
        // Hash the user's password using bcrypt
        const hashedPassword = await bcrypt.hash(user.password, ROUNDS);

        // Create a new UserDao object with the hashed password
        const saved = new UserDao({...user, password:hashedPassword});

        // Save the user object to the database
        return await saved.save();
    } catch (error:any) {
        // If an error occurs during registration, throw a custom error
        throw new UnableToSaveUserError(error.message);
    }
    
}

/**
 * Logs in a user with the provided email and password.
 * Checks if the provided password matches the hashed password stored in the database.
 *
 * @param credentials The user's email and password
 * @returns The user object if login is successful
 */

export async function login(credentials: {email:string, password:string}):Promise<IUserModel>{
    const {email, password} = credentials;

    try {
        // Find a user with the provided email in the database
        const user = await UserDao.findOne({email});

        if(!user){
            // If no user is found, throw a custom error
            throw new InvalidUsernameOrPasswordError("Invalid username or password");
        } else {
            // Compare the provided password with the hashed password stored in the database
            const validPassword: boolean = await bcrypt.compare(password, user.password);

            if(validPassword){
                // If the passwords match, return the user object
                return user;
            } else {
                // If the passwords do not match, throw a custom error
                throw new InvalidUsernameOrPasswordError("Invalid username or password");
            }
        }
    } catch (error:any) {
        // If an error occurs during login, rethrow the error
        throw error;
    }
}



