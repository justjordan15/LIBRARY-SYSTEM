import express from "express";
import AuthController from "../controllers/AuthController";
import {Schemas, ValidateSchema} from '../middlewares/Validation';


// Create a new instance of the Express Router
const router = express.Router();


// Define a POST route for user registration
// Validates the request body against the Schemas.user.create schema
// Handles the request with the AuthController.handleRegister function
router.post("/register", ValidateSchema(Schemas.user.create), AuthController.handleRegister);

// Create a new user account in the library system
// Validates the request body against the Schemas.user.create schema to ensure required fields are present
// Handles the request with the AuthController.handleRegister function, which attempts to create a new user account
router.post("/login", ValidateSchema(Schemas.user.login), AuthController.handleLogin);


// Export the router instance
// Makes the router available for use in other parts of the application
export = router;