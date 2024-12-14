// Import Joi library and its ObjectSchema type
import Joi, {ObjectSchema} from "joi";

// Import Express.js types for Request, Response, and NextFunction
import {NextFunction, Response, Request} from 'express';

// Import IUser interface from User model
import {IUser} from "../models/User";


/**
 * Returns a middleware function that validates the request body against a provided Joi schema.
 * 
 * @param schema - The Joi schema to validate against
 * @returns A middleware function that validates the request body
 */
export function ValidateSchema(schema: ObjectSchema){
    return async (req:Request, res:Response, next:NextFunction): Promise<void> => {
        try {
            // Validate the request body against the schema
            await schema.validateAsync(req.body);
            // If validation succeeds, call the next middleware function
            next();
        } catch (error) {
            // If validation fails, return a 422 error response with a JSON message
            res.status(422).json({message: "Object validation failed, please include a valid object"})
            
        }
    }
}


/**
 * Defines Joi schemas for user creation and login
 */
export const Schemas = {
    user:{
        /**
         * Schema for creating a new user
         */
        create: Joi.object<IUser>({
            // User type (ADMIN, EMPLOYEE, PATRON)
            type: Joi.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
             // First name
            firstName: Joi.string().required(),
            // Last name
            lastName: Joi.string().required(),
            // Email address
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            // Password
            password: Joi.string().required() 
        }),
        /**
         * Schema for user login
         */
        login: Joi.object<{email:string, password:string}>({
            // Email address
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            // Password
            password: Joi.string().required()
        })
    }
}