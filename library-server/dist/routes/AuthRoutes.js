"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const Validation_1 = require("../middlewares/Validation");
// Create a new instance of the Express Router
const router = express_1.default.Router();
// Define a POST route for user registration
// Validates the request body against the Schemas.user.create schema
// Handles the request with the AuthController.handleRegister function
router.post("/register", (0, Validation_1.ValidateSchema)(Validation_1.Schemas.user.create), AuthController_1.default.handleRegister);
// Create a new user account in the library system
// Validates the request body against the Schemas.user.create schema to ensure required fields are present
// Handles the request with the AuthController.handleRegister function, which attempts to create a new user account
router.post("/login", (0, Validation_1.ValidateSchema)(Validation_1.Schemas.user.login), AuthController_1.default.handleLogin);
module.exports = router;
