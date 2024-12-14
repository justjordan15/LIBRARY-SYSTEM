import {Request, Response} from 'express';
import { login, register } from '../services/userService';
import {IUser} from '../models/User';
import { IUserModel } from '../daos/UserDao';
import { InvalidUsernameOrPasswordError } from '../utils/LibraryErrors';


/**
 * Route handler for user registration
 * @param {Request} req - The Express.js request object
 * @param {Response} res - The Express.js response object
 * @returns {Promise<void>} - A Promise that resolves when the response is sent
 */
async function handleRegister(req:Request, res:Response) {
    // Extract the user data from the request body
    const user:IUser = req.body;

    try{
        // Attempt to register the user
        const registeredUser = await register(user);

        // If successful, return a JSON response with a 201 status code
        res.status(201).json({
            message: "User successfully created",
            user: {
                 // Include only the necessary user details in the response
                _id: registeredUser._id,
                type: registeredUser.type,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email
            }
        })

    } catch(error:any){
        // If an error occurs, check if it's a duplicate email error
        if(error.message.includes("E11000 duplicate key error collection:")){
            // If it is, return a 409 status code with a corresponding error message
            res.status(409).json({message: "User with email already exists", error:error.message});
        } else {
            // Otherwise, return a 500 status code with a generic error message
            res.status(500).json({message: "Unable to register user at this time", error:error.message});
        }
    }
    
}


/**
 * Handles user login requests.
 * 
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 */
async function handleLogin(req:Request, res:Response){
    // Extract credentials from the request body.
    const credentials = req.body;

    try {
         // Attempt to log in the user using the provided credentials.
        const loggedIn:IUserModel = await login(credentials);

        // Return a successful response with the user's details.
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: loggedIn._id,
                type: loggedIn.type,
                firstName: loggedIn.firstName,
                lastName: loggedIn.lastName,
                email: loggedIn.email
            }
        })
        
    } catch (error:any) {
        // Handle specific error cases.
        if(error instanceof InvalidUsernameOrPasswordError){
             // Return a 401 error for invalid credentials.
            res.status(401).json({message: "Unable t ologin user at this time", error:error.message});
        } else{
          // Return a 500 error for any other unexpected errors.
        res.status(500).json({message:"Unable to login user at this time", error:error.message});
        }
    }
}

/**
 * Exported module containing route handlers for user registration and login.
 */
export default {handleRegister, handleLogin};